"use client";

import React, { useEffect, useState } from "react";
import { IMessage } from "@/models/message.model";
import axios from "axios";

const Message = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllMessages = async () => {
    try {
      const response = await axios.get("/api/message");
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />
      </div>
    );
  }

  const unreadCount = messages.filter(
    (message) => !message.markAsRead
  ).length;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Messages</h1>

        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <p className="text-zinc-400">
            Total:{" "}
            <span className="font-semibold text-white">
              {messages.length}
            </span>
          </p>

          <p className="text-zinc-400">
            Unread:{" "}
            <span className="font-semibold text-red-400">
              {unreadCount}
            </span>
          </p>

          <p className="text-zinc-400">
            Read:{" "}
            <span className="font-semibold text-green-400">
              {messages.length - unreadCount}
            </span>
          </p>
        </div>
      </div>

      {/* Messages */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          All Messages
        </h2>

        {messages.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-700 py-10 text-center text-zinc-400">
            No messages found
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={String(message._id)}
                className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-5 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">
                        {message.name}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          message.markAsRead
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {message.markAsRead ? "Read" : "Unread"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-blue-400">
                      {message.email}
                    </p>

                    <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
                      {message.message}
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-zinc-700 pt-3 text-xs text-zinc-500">
                  ID: {String(message._id)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;