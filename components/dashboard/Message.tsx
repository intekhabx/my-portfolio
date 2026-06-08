"use client";

import { useEffect, useState } from "react";
import { IMessage } from "@/models/message.model";
import axios from "axios";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

export default function MessageList() {
  const [messages, setMessages]   = useState<IMessage[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");

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

  const handleDeleteMessage = async (id: string) => {
    setError(""); setSuccess("");
    const isConfirmed = confirm("Are you sure to delete?");
    if (!isConfirmed) return;
    try {
      const response = await axios.delete(`/api/message/${id}`);
      setSuccess(response?.data?.message);
      setMessages((prev) => prev.filter((m) => m._id.toString() !== id));
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong.");
    }
  };

  const markMessageAsRead = async (id: string) => {
    setError(""); setSuccess("");
    try {
      const response = await axios.put(`/api/message/${id}`);
      setSuccess(response?.data?.message);
      setMessages((prev) =>
        prev.map((m) =>
          m._id.toString() === id ? ({ ...m, markAsRead: true } as IMessage) : m
        )
      );
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong.");
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div
          className="h-9 w-9 animate-spin rounded-full border-2 border-t-transparent"
          style={{ borderColor: "rgba(255,255,255,0.1)", borderTopColor: "#c8430a" }}
        />
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.markAsRead).length;

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>

      {/* ── Page header ── */}
      <div
        className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:px-8 sm:py-6"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div>
          <p className="text-[9px] tracking-[3px] uppercase mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
            Admin · Content
          </p>
          <h1 className="text-[22px] sm:text-[28px] tracking-[-0.5px]" style={{ fontFamily: "var(--font-serif)", color: "#f0e8d8" }}>
            Messages<em className="italic" style={{ color: "#c8430a" }}>.</em>
          </h1>
        </div>

        {/* Stats pills */}
        <div className="flex items-center gap-2 sm:gap-3">
          {[
            { label: "Total",  value: messages.length,               color: "rgba(255,255,255,0.6)" },
            { label: "Unread", value: unreadCount,                   color: "#c8430a" },
            { label: "Read",   value: messages.length - unreadCount, color: "#22c55e" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="flex flex-col items-center px-3 py-1.5 sm:px-4 sm:py-2"
              style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#161616" }}
            >
              <span className="text-[16px] sm:text-[20px] font-semibold tracking-[-1px]" style={{ color, fontFamily: "var(--font-display)" }}>
                {value}
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[2px] uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Toast notifications ── */}
      <div className="px-4 pt-4 flex flex-col gap-2 sm:px-8">
        {error && (
          <div className="flex items-center gap-3 px-4 py-3 text-[12px] tracking-[0.5px]"
            style={{ background: "rgba(239,68,68,0.08)", borderLeft: "2px solid #ef4444", color: "#ef4444" }}>
            ✕ &nbsp;{error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-3 px-4 py-3 text-[12px] tracking-[0.5px]"
            style={{ background: "rgba(34,197,94,0.08)", borderLeft: "2px solid #22c55e", color: "#22c55e" }}>
            ✓ &nbsp;{success}
          </div>
        )}
      </div>

      {/* ── Messages list ── */}
      <div className="px-4 py-4 flex flex-col gap-0 sm:px-8 sm:py-6">

        {/* Column header — hidden on mobile, shown on sm+ */}
        <div
          className="hidden sm:grid gap-4 px-4 py-2 text-[9px] tracking-[2px] uppercase"
          style={{
            gridTemplateColumns: "1fr 160px 80px 80px",
            color: "rgba(255,255,255,0.2)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span>Message</span>
          <span>Date</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {messages.length === 0 ? (
          <div
            className="py-16 text-center text-[13px]"
            style={{ border: "1px dashed rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)", marginTop: "1px" }}
          >
            No messages yet
          </div>
        ) : (
          messages.map((message) => (
            <div key={String(message._id)}>

              {/* ── MOBILE card layout (< sm) ── */}
              <div
                className="sm:hidden flex flex-col gap-2 px-4 py-4 transition-colors duration-150"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  background: message.markAsRead ? "transparent" : "rgba(200,67,10,0.03)",
                }}
              >
                {/* Top row: name + actions */}
                <div className="flex items-center justify-between">
                  <p className="text-white text-[11px] font-mono font-medium">{message.name}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => markMessageAsRead(message._id.toString())}
                      disabled={message.markAsRead}
                      className="disabled:opacity-80 disabled:cursor-not-allowed"
                      style={{ background: "transparent", border: "none", cursor: message.markAsRead ? "not-allowed" : "pointer", padding: 0 }}
                    >
                      <IoCheckmarkDoneSharp className={`${message?.markAsRead ? "text-green-500" : "text-slate-500"}`} size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(message._id.toString())}
                      className="cursor-pointer"
                      style={{ background: "transparent", border: "none", padding: 0 }}
                    >
                      <RiDeleteBin7Line className="text-slate-500" size={15} />
                    </button>
                  </div>
                </div>

                {/* Email */}
                <p className="text-[11px] text-yellow-400">{message.email}</p>

                {/* Message */}
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {message.message}
                </p>

                {/* Bottom row: date + status */}
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {message.createdAt?.toString().split("T")[0]}
                  </p>
                  <span
                    className="text-[8px] tracking-[1px] uppercase px-2 py-0.5"
                    style={{
                      background: message.markAsRead ? "rgba(34,197,94,0.1)" : "rgba(200,67,10,0.12)",
                      color: message.markAsRead ? "#22c55e" : "#c8430a",
                      border: `1px solid ${message.markAsRead ? "rgba(34,197,94,0.2)" : "rgba(200,67,10,0.2)"}`,
                    }}
                  >
                    {message.markAsRead ? "Read" : "Unread"}
                  </span>
                </div>

                {/* ID */}
                <p className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.12)" }}>
                  ID: {String(message._id)}
                </p>
              </div>

              {/* ── DESKTOP grid layout (sm+) ── */}
              <div
                className="hidden sm:grid gap-4 px-4 py-5 transition-colors duration-150 group"
                style={{
                  gridTemplateColumns: "1fr 160px 80px 80px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  background: message.markAsRead ? "transparent" : "rgba(200,67,10,0.03)",
                  alignItems: "start",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = message.markAsRead ? "transparent" : "rgba(200,67,10,0.03)")}
              >
                <div>
                  <p className="text-white text-[10px] tracking-[0.5px] mt-2 font-mono">{message.name}</p>
                  <p className="text-[12px] tracking-[0.5px] mb-1 text-yellow-400">{message.email}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{message.message}</p>
                  <p className="text-[10px] tracking-[0.5px] mt-2 font-mono" style={{ color: "rgba(255,255,255,0.15)" }}>
                    ID: {String(message._id)}
                  </p>
                </div>
                <div className="pt-0.5">
                  <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {message.createdAt?.toString().split("T")[0]}
                  </p>
                </div>
                <div className="pt-0.5">
                  <span
                    className="text-[9px] tracking-[1px] uppercase px-2 py-1"
                    style={{
                      background: message.markAsRead ? "rgba(34,197,94,0.1)" : "rgba(200,67,10,0.12)",
                      color: message.markAsRead ? "#22c55e" : "#c8430a",
                      border: `1px solid ${message.markAsRead ? "rgba(34,197,94,0.2)" : "rgba(200,67,10,0.2)"}`,
                    }}
                  >
                    {message.markAsRead ? "Read" : "Unread"}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-3 pt-0.5">
                  <button
                    onClick={() => markMessageAsRead(message._id.toString())}
                    title="Mark as read"
                    disabled={message.markAsRead}
                    className="transition-colors duration-150 disabled:opacity-80 disabled:cursor-not-allowed"
                    style={{ cursor: message.markAsRead ? "not-allowed" : "pointer", background: "transparent", border: "none", padding: 0 }}
                  >
                    <IoCheckmarkDoneSharp className={`hover:text-green-500 ${message?.markAsRead ? "text-green-500" : "text-slate-500"}`} size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteMessage(message._id.toString())}
                    title="Delete message"
                    className="transition-colors duration-150 cursor-pointer"
                    style={{ background: "transparent", border: "none", padding: 0 }}
                  >
                    <RiDeleteBin7Line className="hover:text-red-700 text-slate-500" size={15} />
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}