"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-4 bg-[url('/assets/chair1.jpg')]"
    >
      {/* Frosted Glass Signup Card */}
      <div className="w-full max-w-md backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 md:p-10">
        <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-md">
          Create Account
        </h2>

        <form className="flex flex-col gap-5">
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

          <div className="relative">
            <label
              htmlFor="confirm-password"
              className="text-white text-sm font-medium drop-shadow-md"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full mt-2 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-white/80"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600/80 hover:bg-blue-700 text-white py-3 rounded-lg transition font-semibold shadow-md"
          >
            Sign Up
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
          <button className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg py-2 text-white transition">
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            Sign up with Google
          </button>
          <button className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg py-2 text-white transition">
            <Image src="/gitlab.svg" alt="GitLab" width={20} height={20} />
            Sign up with GitLab
          </button>
        </div>

        <p className="text-sm text-center mt-6 text-white/90">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-300 font-medium hover:text-blue-400"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
