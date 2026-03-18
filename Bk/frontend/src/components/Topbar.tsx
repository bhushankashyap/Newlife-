import { useAuthStore } from "@/stores/useAuthStore";
import { LayoutDashboardIcon, LogOut, Waves, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const Topbar = () => {
  const { user, isAdmin, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Signed out");
    navigate("/auth");
  };

  return (
    <div className="flex items-center justify-between px-5 py-3 sticky top-0 bg-[#0a0a18]/80 backdrop-blur-xl z-10 border-b border-white/5">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
          <Waves className="size-4 text-white" />
        </div>
        <span className="text-white font-black text-lg tracking-tight">SoundWave</span>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {isAdmin && (
          <Link
            to="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 transition-all text-xs font-bold uppercase tracking-wider"
          >
            <LayoutDashboardIcon className="size-3.5" />
            Admin
          </Link>
        )}

        {user ? (
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <span className="text-white text-sm font-medium hidden sm:block max-w-[120px] truncate">
                {user.fullName}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#12121f] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-white text-sm font-semibold truncate">{user.fullName}</p>
                  <p className="text-gray-500 text-xs truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/auth"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
