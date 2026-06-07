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
      const response = await axios.post('/api/auth/login', data)
      setSuccess(response?.data?.message);
      router.replace("/admin/dashboard");
      router.refresh();
    } 
    catch (err: any) {
      console.log("error occur", err);
      setError(err.response?.data?.error ||"Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center px-4" style={{ fontFamily: "var(--font-body)" }}>
      <div className="w-full max-w-md relative border" style={{ background: "var(--bg-soft)", borderColor: "var(--line)" }}>
        
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-colors duration-200 hover:bg-[var(--accent)] hover:text-white group border cursor-pointer bg-transparent"
          style={{ borderColor: "var(--line)", color: "var(--ink-muted)" }}
          aria-label="Close"
        >
          <GoX className="text-xl hover:text-white"/>
        </button>

        <div className="px-10 py-8" style={{ borderColor: "var(--line)" }}>
          <p className="text-[9px] tracking-[3px] uppercase mb-3" style={{ color: "var(--ink-muted)" }}>
            Admin Access
          </p>

          <h1 className="text-[32px] tracking-[-1px]" style={{ fontFamily: "var(--font-serif)", color: "var(--ink)", lineHeight: 1.1 }}>
            Welcome{" "}
            <em className="italic" style={{ color: "var(--accent)" }}>
              back.
            </em>
          </h1>

          <p className="text-[13px] mt-2" style={{ color: "var(--ink-muted)" }}>
            Sign in to access your dashboard
          </p>
        </div>

        <form className="px-10 py-8 flex flex-col gap-6" onSubmit={handleSubmit(onsubmit)}>
          
          <div>
            <label className="block text-[9px] tracking-[2px] uppercase mb-2" style={{ color: "var(--ink-muted)" }}>
              Email
            </label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              {...register("email")}
              className="text-[var(--ink)] border-[var(--line)] w-full bg-transparent outline-none text-[13px] py-3 border-b transition-colors duration-200 focus:border-[var(--accent)] placeholder:opacity-30"
              style={{ fontFamily: "var(--font-body)" }}
            />

            {errors.email && (
              <p className="text-[11px] mt-1.5" style={{ color: "var(--accent)" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[9px] tracking-[2px] uppercase mb-2" style={{ color: "var(--ink-muted)" }}>
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="text-[var(--ink)] border-[var(--line)] w-full bg-transparent outline-none text-[13px] py-3 border-b transition-colors duration-200 focus:border-[var(--accent)] placeholder:opacity-30"
              style={{ fontFamily: "var(--font-body)" }}
            />

            {errors.password && (
              <p className="text-[11px] mt-1.5" style={{ color: "var(--accent)" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-[12px] mt-2 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              {error}
            </p>
          )}

          {success && (
            <p className="text-[12px] mt-2 px-3 py-2 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              {success}
            </p>
          )}

          <button
            type="submit"
            className="bg-[var(--accent)] w-full text-[11px] tracking-[2px] uppercase py-3.5 font-medium transition-all duration-200 hover:bg-[var(--accent-hov)] mt-2 text-white border-0 cursor-pointer"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Sign In →
          </button>
        </form>

        <div className="px-10 py-4 flex justify-between items-center border-t" style={{ borderColor: "var(--line)" }}>
          <p className="text-[10px] tracking-[1px]" style={{ color: "var(--ink-muted)" }}>
            Portfolio Admin
          </p>

          <span className="text-[9px] tracking-[2px] uppercase" style={{ color: "var(--ink-muted)" }}>
            v1.0
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;