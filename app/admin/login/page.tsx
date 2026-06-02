"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";


interface ILoginData {
  email: string,
  password: string,
}

const Login = () => {

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onsubmit = async (data: ILoginData) => {
    try {
      const res = await fetch("/api/auth/login", {method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if(!res.ok){
        return setError(result.error)
      }
      setSuccess(result.message);
      router.replace("/admin/dashboard")
    } 
    catch (err) {
      console.log("error occur", err)
      setError("error occur")
    }
  }


  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Admin Login
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Sign in to access your dashboard
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onsubmit)}>
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              {...register("email", {required: "email is required"})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 transition"
            />
            {errors && <p>{errors?.email?.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {required: "password is required"})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 transition"
            />
            {errors && <p>{errors?.password?.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 transition duration-200"
          >
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;