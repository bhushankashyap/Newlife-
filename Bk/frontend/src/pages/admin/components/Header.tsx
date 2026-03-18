import { useAuthStore } from "@/stores/useAuthStore";
import { Waves, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Signed out");
    navigate("/auth");
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Link to="/" className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <Waves className="size-5 text-white" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-white">Music Manager</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage your SoundWave catalog</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-2.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              {user.fullName[0]}
            </div>
            <span className="text-white text-sm font-medium hidden sm:block">{user.fullName}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:block">Sign Out</span>
        </button>
      </div>
    </div>
  );
};
export default Header;
