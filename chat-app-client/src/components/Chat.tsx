/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message, ServerMessage, Typing } from "./Messages";
import { useEffect, useRef } from "react";

interface ChatProps {
  chat: any[];
  user: { id: string };
  typing: string[];
}

const Chat = ({ chat, user, typing }: ChatProps) => {
  console.log(typing);

  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scroller.current) return;

    scroller.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [chat]);

  return (
    <div className="h-full pb-12 md:p-4">
      <div className="w-full h-full max-h-screen rounded-md overflow-y-auto gradient pt-2 md:pt-6">
        {chat.map((message: any, index: number) => {
          message = { ...message, own: message.user?.id === user.id };
          return message.type === "server" ? (
            <ServerMessage key={index} {...message} />
          ) : (
            <Message key={index} {...message} />
          );
        })}
        {typing[0] && <Typing user={typing[0]} />}
        <div ref={scroller} className="pb-2 md:pb-6" />
      </div>
    </div>
  );
};

export default Chat;
