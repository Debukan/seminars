import type { Message } from "../types";


const WS_URL = import.meta.env?.VITE_WS_URL || "ws://localhost:3001";

export type SocketClient = {
  sendMessage: (text: string) => void;
  disconnect: () => void;
};

type SocketCallbacks = {
  onMessage?: (message: Message) => void;
  onStatus?: (status: string) => void;
  onError?: (error: unknown) => void;
};

export function connectSocket(token: string, { onMessage, onStatus, onError }: SocketCallbacks): SocketClient {
  const socket = new WebSocket(WS_URL);

  socket.addEventListener("open", () => {
    onStatus?.("connected");
  });

  socket.addEventListener("close", () => {
    onStatus?.("disconnected");
  });

  socket.addEventListener("error", () => {
    onError?.("Не удалось подключиться к чату.");
  });

  socket.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data) as { type: string; payload: unknown };
      if (data.type === "message:new") {
        onMessage?.(data.payload as Message);
      } else if (data.type === "error") {
        onError?.(String(data.payload));
      }
    } catch (error) {
      onError?.(error);
    }
  });

  return {
    sendMessage: (text: string) => {
      if (!text) return;
      if (socket.readyState !== WebSocket.OPEN) throw new Error("Нет соединения с чатом.");
      socket.send(JSON.stringify({ type: "message:send", payload: { text, token } }));
    },
    disconnect: () => {
      socket.close();
    }
  };
}
