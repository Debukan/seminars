import React, { useEffect, useState } from "react";
import type { Message } from "../types";
import { getMessages, sendMessage } from "../api/messageApi";
import { connectSocket } from "../api/socketClient";
import type { SocketClient } from "../api/socketClient";
import { MessageList } from "../components/MessageList";
import { MessageInput } from "../components/MessageInput";
import { handleError } from "../helpers/handleError";

type Props = {
  token: string;
};

function mergeMessages(current: Message[], incoming: Message[]): Message[] {
  return [...current, ...incoming.filter((message) => !current.some((item) => item.id === message.id))];
}

export function ChatPage({ token }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [socketStatus, setSocketStatus] = useState<string>("disconnected");
  const [socketClient, setSocketClient] = useState<SocketClient | null>(null);
  const [sendByHttp, setSendByHttp] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const client = connectSocket(token, {
      onMessage: (message) => {
        if (active) setMessages((current) => mergeMessages(current, [message]));
      },
      onStatus: (status) => { if (active) setSocketStatus(status); },
      onError: (error) => { if (active) setError(handleError(error)); }
    });
    setSocketClient(client);
    getMessages(token).then((history) => {
      if (!Array.isArray(history)) throw new Error("Сервер вернул некорректный список сообщений.");
      if (active) setMessages((current) => mergeMessages(history, current));
    }).catch((error: unknown) => {
      if (active) setError(handleError(error));
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
      client.disconnect();
    };
  }, [token]);

  const handleSend = async (text: string) => {
    setError("");
    try {
      if (sendByHttp) {
        const message = await sendMessage(token, text);
        if (!message?.id) throw new Error("Сервер вернул пустое или некорректное сообщение.");
        setMessages((current) => mergeMessages(current, [message]));
      } else {
        if (!socketClient) throw new Error("Нет соединения с чатом.");
        socketClient.sendMessage(text);
      }
    } catch (error) {
      setError(handleError(error));
    }
  };

  return (
    <div>
      <h2>Чат</h2>
      <p>Статус сокета: {socketStatus}</p>
      {loading ? <p>Загрузка сообщений...</p> : null}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <MessageList messages={messages} />
      <label htmlFor="send-method">Способ отправки </label>
      <select id="send-method" value={sendByHttp ? "http" : "socket"} onChange={(e) => setSendByHttp(e.target.value === "http")}>
        <option value="socket">WebSocket</option>
        <option value="http">HTTP (Axios)</option>
      </select>
      <MessageInput onSend={handleSend} disabled={loading || socketStatus !== "connected"} />
    </div>
  );
}

export default ChatPage;
