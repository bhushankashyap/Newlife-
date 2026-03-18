import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, Music2, Radio, Waves } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const { login, register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        await login(form.email, form.password);
        toast.success("Welcome back!");
      } else {
        await register(form.fullName, form.email, form.password);
        toast.success("Account created!");
      }
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#06060f] flex overflow-hidden font-['Syne',sans-serif]">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-16 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-[80px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-16">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Waves className="size-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <span className="text-3xl font-black text-white tracking-tight">SoundWave</span>
          </div>

          {/* Vinyl record art */}
          <div className="relative w-64 h-64 mx-auto mb-12">
            <div className="absolute inset-0 rounded-full border border-violet-500/20 animate-[spin_20s_linear_infinite]">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-violet-500/10"
                  style={{ inset: `${i * 18}px` }}
                />
              ))}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-violet-950/50 to-gray-900 border border-violet-500/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/40" />
            <div className="absolute inset-[44%] rounded-full bg-[#06060f]" />
          </div>

          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Music that moves<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              your soul
            </span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-sm mx-auto">
            Stream millions of songs, connect with friends, and discover your next favorite artist.
          </p>

          {/* Floating icons */}
          <div className="absolute top-20 right-8 p-3 bg-violet-500/10 border border-violet-500/20 rounded-2xl backdrop-blur-sm">
            <Music2 className="size-5 text-violet-400" />
          </div>
          <div className="absolute bottom-32 left-8 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl backdrop-blur-sm">
            <Radio className="size-5 text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/10 to-transparent" />

        <div className="relative w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <Waves className="size-5 text-white" />
            </div>
            <span className="text-xl font-black text-white">SoundWave</span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-white/5 rounded-2xl p-1 mb-8 border border-white/5">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 capitalize tracking-wider ${
                  mode === m
                    ? "bg-gradient-to-r from-violet-600 to-violet-700 text-white shadow-lg shadow-violet-500/20"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <h1 className="text-3xl font-black text-white mb-1">
            {mode === "login" ? "Welcome back" : "Join SoundWave"}
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            {mode === "login"
              ? "Sign in to continue your musical journey"
              : "Create your account and start listening"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Your name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/60 focus:bg-violet-500/5 transition-all duration-200 text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/60 focus:bg-violet-500/5 transition-all duration-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/60 focus:bg-violet-500/5 transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-bold text-white text-sm tracking-wider uppercase bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0 mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </span>
              ) : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs mt-8">
            {mode === "login" ? "New to SoundWave? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              {mode === "login" ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
