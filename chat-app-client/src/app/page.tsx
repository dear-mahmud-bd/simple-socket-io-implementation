/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Chat, Inputs, SignUp } from "@/components";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

type ChatMessage = {
  content: string;
  type?: string;
};

interface UserType {
  id: string;
  [key: string]: any; 
}

export default function Home() {
  const user = useRef<UserType | null>(null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState<string[]>([]);
  const [chat, setChat] = useState<ChatMessage[]>([]);

  useEffect(() => {
    socket.emit("client_ready", "Hellow from client");
    socket.on("do_som", () => {
      console.log("clicked");
    });

    socket.on("recieve_message", (msg: ChatMessage) => {
      if (!user.current) return;
      setChat((prev) => [...prev, msg]);
    });

    socket.on("user_typing", (data: { user: string; typing: boolean }) => {
      if (!user.current) return;
      setTyping((prev) => {
        if (typing.includes(data.user) && data.typing === true) return prev;
        if (data.typing === false) {
          return prev.filter((u) => u !== data.user);
        } else {
          return [...prev, data.user];
        }
      });
    });

    socket.on("new_user", (newUser: string) => {
      if (!user.current) return;
      setChat((prev) => [
        ...prev,
        { content: `${newUser} joined`, type: "server" },
      ]);
    });

    return () => {
      socket.off("recieve_message");
      socket.off("user_typing");
      socket.off("new_user");
    };
  }, [typing]);

  return (
    <main className="h-screen max-h-screeen max-w-screen mx-auto md:container md:p-20 md:pt-4">
      {/* <button onClick={()=>socket.emit("btn_click","Hellow from btn_click")}>click</button> */}
      {user.current ? (
        <>
          <Chat user={user.current} chat={chat} typing={typing} />
          <Inputs setChat={setChat} user={user.current} socket={socket} />
        </>
      ) : (
        <SignUp user={user} socket={socket} input={input} setInput={setInput} />
      )}
    </main>
  );
}
