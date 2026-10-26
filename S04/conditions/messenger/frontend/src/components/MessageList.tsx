import React from "react";
import type { Message } from "../types";

type Props = {
  messages: Message[];
};

export function MessageList({ messages }: Props) {
  if (!messages?.length) {
    return <p>Нет сообщений</p>;
  }

  return (
    <ul className="messages" aria-label="Сообщения">
      {messages.map((message) => <li key={message.id}>
        <strong>{message.author}</strong>{" "}
        <time dateTime={message.createdAt}>{new Date(message.createdAt).toLocaleString("ru-RU")}</time>
        <p>{message.text}</p>
      </li>)}
    </ul>
  );
}

export default MessageList;
