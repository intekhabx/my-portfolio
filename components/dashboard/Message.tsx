"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// ── React Icons ──
import {
  MdMessage,
  MdMarkEmailRead,
  MdClose,
  MdSearch,
  MdRefresh,
  MdEmail,
  MdCalendarToday,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiMaximize2, FiClock } from "react-icons/fi";

interface IMessage {
  _id: string;
  name?: string;
  email: string;
  message: string;
  markAsRead?: boolean;
  createdAt?: string | Date;
}

export default function MessageManagement() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // ── Fetch Messages ──
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/message");
      if (res.data?.data) {
        setMessages(res.data.data);
      } else if (Array.isArray(res.data)) {
        setMessages(res.data);
      }
    } catch (err: any) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  // ── Mark Message As Read (Only Mark as Read Logic) ──
  const handleMarkAsRead = async (id: string) => {
    const targetMsg = messages.find((m) => m._id === id);
    if (targetMsg?.markAsRead) return; // Pehle se read hai toh dobara request mat karo

    try {
      await axios.patch(`/api/message/${id}`);
      setSuccess("Message marked as read");

      setMessages((prev) =>
        prev.map((m) =>
          m._id.toString() === id ? ({ ...m, markAsRead: true } as IMessage) : m
        )
      );

      // Agar modal me opened selectedMessage hai toh use bhi status update karo
      if (selectedMessage?._id === id) {
        setSelectedMessage((prev) => (prev ? { ...prev, markAsRead: true } : null));
      }
    } catch (err: any) {
      setError("Failed to update message status.");
    }
  };

  // ── Delete Message ──
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`/api/message/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
      setSuccess("Message deleted successfully.");
    } catch (err: any) {
      setError("Failed to delete message.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (msg.name && msg.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const unreadCount = messages.filter((m) => !m.markAsRead).length;

  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        color: "var(--ink)",
        backgroundColor: "var(--bg)",
      }}
      className="min-h-screen pb-20 transition-colors duration-300"
    >
      {/* ── Control Header ── */}
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-md"
        style={{
          borderColor: "var(--line)",
          backgroundColor: "var(--bg)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="inline-block w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <p
                className="text-[10px] font-mono tracking-[2px] uppercase font-semibold"
                style={{ color: "var(--ink-muted)" }}
              >
                Inbox Control
              </p>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              Messages
              <span
                className="text-xs px-2.5 py-1 rounded-full font-mono border"
                style={{
                  backgroundColor: "var(--bg-soft)",
                  borderColor: "var(--line)",
                  color: "var(--ink-soft)",
                }}
              >
                {messages.length}
              </span>
              {unreadCount > 0 && (
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-mono text-white font-medium"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {unreadCount} Unread
                </span>
              )}
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <MdSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: "var(--ink-muted)" }}
              />
              <input
                type="text"
                placeholder="Search inbox..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border transition-all focus:outline-none"
                style={{
                  backgroundColor: "var(--bg-soft)",
                  borderColor: "var(--line)",
                  color: "var(--ink)",
                }}
              />
            </div>

            <button
              onClick={fetchMessages}
              className="p-2.5 rounded-xl border transition-all cursor-pointer"
              style={{
                backgroundColor: "var(--bg-soft)",
                borderColor: "var(--line)",
                color: "var(--ink-soft)",
              }}
              title="Refresh Inbox"
            >
              <MdRefresh
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Status Alerts ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
        {error && (
          <div
            className="flex items-center justify-between px-4 py-3 text-xs font-mono rounded-xl border mb-3"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              borderColor: "rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
            }}
          >
            <span>{error}</span>
            <button onClick={() => setError("")}>
              <MdClose className="w-4 h-4" />
            </button>
          </div>
        )}
        {success && (
          <div
            className="flex items-center justify-between px-4 py-3 text-xs font-mono rounded-xl border mb-3"
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.08)",
              borderColor: "rgba(34, 197, 94, 0.2)",
              color: "#22c55e",
            }}
          >
            <span>{success}</span>
            <button onClick={() => setSuccess("")}>
              <MdClose className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ── Messages List ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        {loading ? (
          <div
            className="flex min-h-[350px] w-full flex-col items-center justify-center gap-3"
            style={{ color: "var(--ink-soft)" }}
          >
            <div
              className="h-7 w-7 animate-spin rounded-full border-2 border-t-transparent"
              style={{
                borderColor: "var(--line)",
                borderTopColor: "var(--accent)",
              }}
            />
            <p className="font-mono text-xs">Loading messages...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div
            className="py-20 text-center rounded-2xl border border-dashed flex flex-col items-center justify-center gap-3"
            style={{
              borderColor: "var(--line)",
              backgroundColor: "var(--bg-soft)",
              color: "var(--ink-muted)",
            }}
          >
            <MdMessage className="w-10 h-10 opacity-40" />
            <p className="text-sm font-mono">No messages found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredMessages.map((msg) => {
              const isUnread = !msg.markAsRead;
              const dateFormatted = msg.createdAt
                ? new Date(msg.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recent";

              return (
                <div
                  key={msg._id}
                  className="group relative rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                  style={{
                    backgroundColor: "var(--bg-soft)",
                    borderColor: isUnread ? "var(--accent)" : "var(--line)",
                  }}
                >
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl text-xs font-bold tracking-wider uppercase border shrink-0"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--line)",
                        color: "var(--accent)",
                      }}
                    >
                      {msg.email.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-sm font-semibold truncate"
                          style={{ color: "var(--ink)" }}
                        >
                          {msg.name || msg.email}
                        </span>
                        {isUnread && (
                          <span
                            className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded text-white font-semibold"
                            style={{ backgroundColor: "var(--accent)" }}
                          >
                            New
                          </span>
                        )}
                        <span
                          className="text-[11px] font-mono flex items-center gap-1"
                          style={{ color: "var(--ink-muted)" }}
                        >
                          <MdCalendarToday className="w-3 h-3" />
                          {dateFormatted}
                        </span>
                      </div>

                      <p
                        className="text-xs truncate flex items-center gap-1"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        <MdEmail className="w-3.5 h-3.5 opacity-60" />
                        <span>{msg.email}</span>
                      </p>

                      <p
                        className="text-xs line-clamp-2 pt-1 leading-relaxed"
                        style={{ color: "var(--ink)" }}
                      >
                        {msg.message}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-2 shrink-0 self-end md:self-center border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <button
                      onClick={() => setSelectedMessage(msg)}
                      className="px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--line)",
                        color: "var(--ink)",
                      }}
                    >
                      <FiMaximize2 className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>

                    {/* ── Mark Read Button (Read hone par disabled / fixed state) ── */}
                    {msg.markAsRead ? (
                      <span className="p-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-xs font-mono">
                        <MdMarkEmailRead className="w-4 h-4" />
                        <span className="hidden sm:inline">Read</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMarkAsRead(msg._id)}
                        className="p-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all cursor-pointer"
                        title="Mark as Read"
                      >
                        <MdMarkEmailRead className="w-3 h-3" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="p-2 rounded-xl border text-red-500 border-red-500/20 bg-red-500/10 transition-all cursor-pointer hover:bg-red-500/20"
                      title="Delete Message"
                    >
                      <RiDeleteBin6Line className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── Detail Modal Lightbox ── */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="relative max-w-xl w-full rounded-2xl border p-6 shadow-2xl overflow-hidden"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--line)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between border-b pb-4 mb-4"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl text-xs font-bold border"
                  style={{
                    backgroundColor: "var(--bg-soft)",
                    borderColor: "var(--line)",
                    color: "var(--accent)",
                  }}
                >
                  {selectedMessage.email.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3
                    className="text-base font-semibold"
                    style={{ color: "var(--ink)" }}
                  >
                    {selectedMessage.name || selectedMessage.email}
                  </h3>
                  <p
                    className="text-xs font-mono"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {selectedMessage.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 rounded-xl border cursor-pointer hover:bg-[var(--accent)]/10"
                style={{
                  borderColor: "var(--line)",
                  color: "var(--ink-soft)",
                }}
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div
                className="flex items-center justify-between text-xs font-mono p-3 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-soft)",
                  borderColor: "var(--line)",
                  color: "var(--ink-soft)",
                }}
              >
                <span className="flex items-center gap-1.5">
                  <FiClock className="w-3.5 h-3.5" />
                  Received:{" "}
                  {selectedMessage.createdAt
                    ? new Date(selectedMessage.createdAt).toLocaleString()
                    : "N/A"}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                    selectedMessage.markAsRead
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                  }`}
                >
                  {selectedMessage.markAsRead ? "Read" : "Unread"}
                </span>
              </div>

              <div
                className="p-4 rounded-xl border min-h-[120px] max-h-[260px] overflow-y-auto"
                style={{
                  backgroundColor: "var(--bg-soft)",
                  borderColor: "var(--line)",
                }}
              >
                <p
                  className="text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ color: "var(--ink)" }}
                >
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div
              className="flex items-center justify-between border-t pt-4 mt-6"
              style={{ borderColor: "var(--line)" }}
            >
              <a
                href={`mailto:${selectedMessage.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-medium hover:opacity-90 transition-all"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <MdEmail className="w-4 h-4" />
                <span>Reply via Email</span>
              </a>

              <div className="flex items-center gap-2">
                {!selectedMessage.markAsRead && (
                  <button
                    onClick={() => handleMarkAsRead(selectedMessage._id)}
                    className="px-3 py-2 rounded-xl border text-xs transition-all cursor-pointer"
                    style={{
                      backgroundColor: "var(--bg-soft)",
                      borderColor: "var(--line)",
                      color: "var(--ink)",
                    }}
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="px-3 py-2 rounded-xl border text-xs text-red-500 border-red-500/20 bg-red-500/10 hover:bg-red-500/20 transition-all cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
