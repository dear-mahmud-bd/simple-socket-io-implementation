/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

interface MessageProps {
  content: string;
  type: "text" | "image";
  own: boolean;
  user: {
    name: string;
    id: string;
    [key: string]: any;
  };
}

const Message = ({ content, type, own, user }: MessageProps) => {
  return (
    <p className={`message px-1 md:px-6 py-1 flex ${own && "justify-end"}`}>
      {!own && (
        <span
          className={`logo text-2xl bg-blue-600 text-white rounded-full py-2 text-center px-4 mr-2 flex items-center ${
            type === "text" ? "my-auto" : "max-h-12"
          }`}
        >
          {user.name.charAt(0).toUpperCase()}
        </span>
      )}
      <span
        className={`text-xl md:text-3xl py-2 rounded-2xl 
            ${type === "text" ? "px-6" : "px-2"}
            ${own ? "bg-sky-400 text-white" : " bg-slate-300"}
            `}
      >
        {type === "text" ? (
          content
        ) : (
          <Image
            width={600}
            height={500}
            src={content}
            className="rounded-md w-full"
            alt="image"
          />
        )}
      </span>
    </p>
  );
};

export default Message;
