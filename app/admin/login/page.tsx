"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchemaType, loginSchemaDto } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoX } from "react-icons/go";
import axios from "axios";

const Login = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchemaDto),
  });

  const onsubmit = async (data: LoginSchemaType) => {
    setError("");
    setSuccess("");
    try {
      const response = await axios.post('/api/auth/login', data);
      setSuccess(response?.data?.message);
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
        // router.refresh();
        // router.replace("/admin/dashboard");
      }, 500);
    } 
    catch (err: any) {
      console.log("error occur", err);
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-300"
      style={{ 
        background: "var(--bg)", 
        color: "var(--ink)", 
        fontFamily: "var(--font-body)" 
      }}
    >
      {/* Structural Card Frame */}
      <div 
        className="w-full max-w-lg rounded-2xl border shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300"
        style={{ 
          borderColor: "var(--line)", 
          background: "var(--bg)" 
        }}
      >
        
        {/* Top Window Header Bar */}
        <div 
          className="flex items-center justify-between px-5 py-3.5 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          {/* Window Control Dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* Breadcrumb Tag */}
          <div 
            className="flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border"
            style={{ 
              borderColor: "var(--line)", 
              color: "var(--ink-muted)",
              background: "rgba(0, 0, 0, 0.02)"
            }}
          >
            <span className="opacity-50">🔒</span> admin.intekhab.dev
          </div>

          {/* Close Action */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[var(--line)] cursor-pointer"
            style={{ color: "var(--ink-muted)" }}
            aria-label="Close"
          >
            <GoX className="text-base" />
          </button>
        </div>

        {/* Header Section */}
        <div className="px-8 sm:px-10 pt-8 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase mb-4 border" style={{ borderColor: "var(--line)", color: "var(--accent)" }}>
            ✦ Restricted Access
          </div>

          <h1 className="text-3xl sm:text-4xl tracking-tight font-bold" style={{ fontFamily: "var(--font-serif)", color: "var(--ink)", lineHeight: 1.1 }}>
            Welcome{" "}
            <em className="italic font-serif font-normal" style={{ color: "var(--accent)" }}>
              back.
            </em>
          </h1>

          <p className="text-xs sm:text-sm mt-2 font-normal" style={{ color: "var(--ink-muted)" }}>
            Authenticate to access your portfolio control panel
          </p>
        </div>

        {/* Login Form */}
        <form className="px-8 sm:px-10 pb-8 pt-2 flex flex-col gap-5" onSubmit={handleSubmit(onsubmit)}>
          
          <div>
            <label className="block text-[10px] font-mono tracking-[2px] uppercase mb-2" style={{ color: "var(--ink-muted)" }}>
              Email Address
            </label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              {...register("email")}
              className="w-full bg-transparent outline-none text-sm py-3 border-b transition-colors duration-200 focus:border-[var(--accent)] placeholder:opacity-30"
              style={{ 
                fontFamily: "var(--font-body)", 
                borderColor: "var(--line)",
                color: "var(--ink)"
              }}
            />

            {errors.email && (
              <p className="text-[11px] font-mono mt-1.5" style={{ color: "var(--accent)" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-mono tracking-[2px] uppercase mb-2" style={{ color: "var(--ink-muted)" }}>
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full bg-transparent outline-none text-sm py-3 border-b transition-colors duration-200 focus:border-[var(--accent)] placeholder:opacity-30"
              style={{ 
                fontFamily: "var(--font-body)", 
                borderColor: "var(--line)",
                color: "var(--ink)"
              }}
            />

            {errors.password && (
              <p className="text-[11px] font-mono mt-1.5" style={{ color: "var(--accent)" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-xs mt-1 px-3.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error}
            </p>
          )}

          {success && (
            <p className="text-xs mt-1 px-3.5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {success}
            </p>
          )}

          <button
            type="submit"
            className="w-full text-xs font-mono tracking-[2px] uppercase py-3.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-md active:scale-[0.99] mt-3 cursor-pointer"
            style={{ 
              background: "var(--accent)", 
              color: "#ffffff",
              fontFamily: "var(--font-body)" 
            }}
          >
            Sign In →
          </button>
        </form>

        {/* Footer Meta */}
        <div 
          className="px-8 sm:px-10 py-3.5 flex justify-between items-center border-t text-[10px] font-mono"
          style={{ borderColor: "var(--line)", color: "var(--ink-muted)" }}
        >
          <span>Portfolio Admin Panel</span>
          <span>v2.0</span>
        </div>

      </div>
    </div>
  );
};

export default Login;