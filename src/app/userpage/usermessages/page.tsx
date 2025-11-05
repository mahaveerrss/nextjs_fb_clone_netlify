"use client";
import { HomeIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { JSX, useEffect, useRef, useState } from "react";
import { useUserUIContext } from "../../../component/contextApi/store";
import { useRouter } from "next/navigation";

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
  const { dark } = useUserUIContext();
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0].id);
  const [inputValue, setInputValue] = useState<string>("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  useEffect(() => {
    const ws = new WebSocket("wss://echo.websocket.org/");
    ws.onopen = () => setSocket(ws);
    return () => ws.close();
  }, []);

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

    socket.send(JSON.stringify(newMsg));
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
            c.id === activeConvId ? { ...c, messages: [...c.messages, data] } : c
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
    setSidebarOpen(false); // auto-close sidebar on mobile
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${
        dark ? "dark:bg-slate-900 dark:text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Sidebar (collapsible on mobile) */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out
        fixed md:static z-40 top-0 left-0 h-full w-72 sm:w-80 flex-shrink-0 border-r border-gray-700
        ${dark ? "bg-slate-900 text-white" : "bg-white text-black"}`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold">Messages</h2>
          <button
            className="md:hidden text-gray-400 hover:text-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-3">
          <input
            className={`w-full rounded-md border border-gray-600 px-3 py-2 text-sm ${
              dark ? "bg-slate-800 text-white" : "bg-gray-100 text-black"
            }`}
            placeholder="Search..."
          />
        </div>

        <div className="overflow-y-auto flex flex-col gap-3 h-[calc(100vh-160px)] pb-4">
          {conversations.map((c) => (
            <button
              key={c.id}
              className={`flex items-center gap-3 px-4 py-3 text-left rounded-lg ${
                c.id === activeConvId
                  ? "bg-indigo-100 dark:bg-indigo-700"
                  : "hover:bg-gray-100 dark:hover:bg-slate-700"
              }`}
              onClick={() => selectConversation(c.id)}
            >
              <div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                {c.name[0]}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between">
                  <div className="font-medium truncate">{c.name}</div>
                  <div className="text-xs text-slate-400 truncate">
                    {c.lastSeen}
                  </div>
                </div>
                <div className="text-sm truncate">
                  {c.messages[c.messages.length - 1]?.text}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Overlay (for mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        />
      )}

      {/* Main chat area */}
      <main
        className={`flex-1 flex flex-col md:ml-0 transition-all ${
          dark ? "dark:bg-slate-900 dark:text-slate-100" : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`border-b border-gray-700 p-4 flex items-center justify-between ${
            dark ? "bg-slate-900 text-white" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
              {activeConv?.name?.[0]}
            </div>
            <div>
              <div className="font-semibold text-sm sm:text-base">
                {activeConv?.name}
              </div>
              <div className="text-xs text-slate-500">{activeConv?.lastSeen}</div>
            </div>
          </div>
          <HomeIcon
            onClick={() => router.replace("/userpage")}
            className="h-6 w-6 cursor-pointer text-blue-600 hover:text-blue-800"
          />
        </div>

        {/* Messages */}
        <div
          className={`flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 ${
            dark ? "dark:bg-slate-900 dark:text-slate-100" : ""
          }`}
        >
          <div className="max-w-3xl mx-auto">
            {activeConv?.messages.map((m) => (
              <div
                key={m.id}
                className={`mb-4 flex ${
                  m.fromMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-xl p-3 sm:p-4 text-sm sm:text-base max-w-[80%] sm:max-w-[70%] ${
                    m.fromMe
                      ? "bg-indigo-500 text-white"
                      : dark
                      ? "bg-slate-800 text-white"
                      : "bg-gray-100 text-gray-900 shadow-sm"
                  }`}
                >
                  <div>{m.text}</div>
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
          className={`p-3 sm:p-4 border-t border-gray-700 flex items-center gap-2 sm:gap-3 ${
            dark ? "bg-slate-900 text-white" : "bg-white"
          }`}
        >
          <label className="cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileChange} />
            <div className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800">
              📎
            </div>
          </label>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Write a message..."
            className={`flex-1 rounded-full border px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none ${
              dark
                ? "bg-slate-800 text-white border-gray-700"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-indigo-700 active:bg-indigo-800 text-sm sm:text-base"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
