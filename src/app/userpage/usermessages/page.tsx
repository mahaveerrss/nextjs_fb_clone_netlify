"use client";
import {
  HomeIcon,
} from "@heroicons/react/24/solid";
import React, { JSX, useEffect, useRef, useState } from "react";
import { useUserUIContext } from "../../../component/contextApi/store";
import { useRouter } from "next/navigation";

// Define types
interface Message {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  lastSeen: string;
  messages: Message[];
}

export default function MessengerPage(): JSX.Element {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Ananya",
      lastSeen: "online",
      messages: [
        { id: "m1", fromMe: false, text: "hey! are you free today?", time: "10:02 AM" },
        { id: "m2", fromMe: true, text: "Yes, free after 4 — what's up?", time: "10:03 AM" },
      ],
    },
    {
      id: "2",
      name: "Ravi",
      lastSeen: "2h",
      messages: [{ id: "m3", fromMe: false, text: "check out the repo I sent", time: "Yesterday" }],
    },
  ]);

  const router = useRouter();
  const { dark, setDark } = useUserUIContext();

  const [activeConvId, setActiveConvId] = useState<string>(conversations[0].id);
  const [inputValue, setInputValue] = useState<string>("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  // WebSocket setup
  useEffect(() => {
    const ws = new WebSocket("wss://echo.websocket.org/");

    ws.onopen = () => {
      console.log("socket open");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("socket closed");
      setSocket(null);
    };

    return () => {
      ws.close();
      setSocket(null);
    };
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConvId, conversations]);

  const sendMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      alert("No Internet! Please reload page.");
      return;
    }

    const trimmed = inputValue.trim();
    if (!trimmed && !attachment) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      fromMe: true,
      text: trimmed || (attachment ? `Sent a file: ${attachment.name}` : ""),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // send message
    socket.send(JSON.stringify(newMsg));

    // Show sent message immediately
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId ? { ...c, messages: [...c.messages, newMsg] } : c
      )
    );

    socket.onmessage = (event: MessageEvent) => {
      try {
        const data: Message = JSON.parse(event.data);
        data.fromMe = false;
        data.id = "R" + data.id;

        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConvId
              ? { ...c, messages: [...c.messages, data] }
              : c
          )
        );
      } catch {
        console.log("Received text:", event.data);
      }
    };

    setInputValue("");
    setAttachment(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachment(file);
  };

  const selectConversation = (id: string) => {
    setActiveConvId(id);
  };

  return (
    <div
      className={`min-h-screen flex bg-slate-50 text-slate-900 ${
        dark ? "dark:bg-slate-900 dark:text-slate-100" : ""
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-80 border-r border-gray-700 bg-white ${
          dark ? "dark:bg-slate-900 dark:text-slate-100" : ""
        }`}
      >
        <div
          className={`p-4 border-b border-gray-700 ${
            dark ? "dark:bg-slate-900 dark:text-slate-100" : ""
          }`}
        >
          <h2 className="text-xl font-semibold">Messages</h2>
          <div className="mt-2 text-sm text-slate-500">
            Search, start new chat, or choose a conversation
          </div>
        </div>

        <div className="p-2">
          <input
            className={`w-full rounded-md border border-gray-800 px-3 py-2 text-sm bg-white ${
              dark ? "dark:bg-slate-900 dark:text-slate-100" : ""
            }`}
            placeholder="Search..."
          />
        </div>

        <div className="overflow-y-auto flex flex-col gap-3 h-[calc(100vh-160px)]">
          {conversations.map((c) => (
            <button
              key={c.id}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 ${
                dark ? "bg-slate-800 hover:bg-slate-500 text-indigo-500" : ""
              } ${c.id === activeConvId ? "bg-slate-100" : ""}`}
              onClick={() => selectConversation(c.id)}
            >
              <div
                className={`h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium ${
                  dark ? "dark:bg-slate-900 dark:text-slate-100" : ""
                }`}
              >
                {c.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-slate-400">{c.lastSeen}</div>
                </div>
                <div className="text-sm text-black truncate">
                  {c.messages[c.messages.length - 1]?.text}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main chat area */}
      <main
        className={`flex-1 flex flex-col bg-white ${
          dark ? "dark:bg-slate-900 dark:text-slate-100" : ""
        }`}
      >
        <div
          className={`border-b justify-between border-gray-700 bg-white p-4 flex items-center gap-4 ${
            dark ? "dark:bg-slate-900 dark:text-slate-100" : ""
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium ${
                dark ? "dark:bg-slate-700 dark:text-slate-200" : ""
              }`}
            >
              {activeConv?.name?.[0]}
            </div>
            <div>
              <div className="font-semibold">{activeConv?.name}</div>
              <div className="text-xs text-slate-500">
                {activeConv?.lastSeen} • Active
              </div>
            </div>
          </div>

          <HomeIcon
            onClick={() => router.replace("/userpage")}
            className="h-6 w-6 hover:text-blue-800 active:text-blue-900 cursor-pointer text-blue-600"
          />
        </div>

        <div
          className={`flex-1 overflow-y-auto px-6 py-6 ${
            dark ? "dark:bg-slate-900 dark:text-slate-100" : ""
          }`}
        >
          <div className="max-w-3xl mx-auto">
            {activeConv?.messages.map((m) => (
              <div
                key={m.id}
                className={`mb-4 flex ${m.fromMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-xl p-3 max-w-[70%] ${
                    m.fromMe
                      ? "bg-indigo-500 text-white"
                      : `bg-white shadow ${dark ? "dark:bg-slate-900 dark:text-slate-100" : ""}`
                  }`}
                >
                  <div className="text-sm">{m.text}</div>
                  <div className="text-xs mt-1 text-slate-400">{m.time}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Composer */}
        <form
          onSubmit={sendMessage}
          className={`p-4 border-t border-gray-700 bg-white ${
            dark ? "dark:bg-slate-900 dark:text-slate-100" : ""
          }`}
        >
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <label className="cursor-pointer">
              <input type="file" className="hidden" onChange={handleFileChange} />
              <div
                className={`p-2 rounded-md hover:bg-slate-100 ${
                  dark ? "dark:bg-slate-900 dark:text-slate-100" : ""
                }`}
              >
                📎
              </div>
            </label>

            <div className="flex-1">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Write a message..."
                className={`w-full rounded-full border px-4 py-2 bg-white ${
                  dark ? "dark:bg-slate-900 dark:text-slate-100" : ""
                }`}
              />
              {attachment && (
                <div className="mt-2 text-xs text-slate-500">
                  Attachment: {attachment.name}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 active:bg-indigo-800"
            >
              Send
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
