"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/dashboard",
    });
    setLoading(false);
    if (res?.error) setError("Invalid credentials");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center p-4 bg-[url('/assets/chair1.jpg')] bg-cover bg-center">
      {/* Frosted Glass Login Card */}
      <div className="w-full max-w-md backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 md:p-10">
        <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-md">
          Welcome Back
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="text-white text-sm font-medium drop-shadow-md"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              className="w-full mt-2 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="text-white text-sm font-medium drop-shadow-md"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-2 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-white/80"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-200 hover:text-blue-400 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600/80 hover:bg-blue-700 text-white py-3 rounded-lg transition font-semibold shadow-md"
          >
            Log In
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="grow h-px bg-white/40"></div>
          <span className="px-3 text-white/80 text-sm">Or</span>
          <div className="grow h-px bg-white/40"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3">
          <button
            className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg py-2 text-white transition"
            onClick={() => {
              signIn("google");
            }}
          >
            Sign in with Google
          </button>
        </div>

        <p className="text-sm text-center mt-6 text-white/90">
          Have no account yet?{" "}
          <Link
            href="/signup"
            className="text-blue-300 font-medium hover:text-blue-400"
          >
            Registration
          </Link>
        </p>
      </div>
    </div>
  );
}
