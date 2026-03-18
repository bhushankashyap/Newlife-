import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { loadFromStorage, user } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFromStorage();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user?._id) {
      initSocket(user._id);
    } else {
      disconnectSocket();
    }
    return () => disconnectSocket();
  }, [user?._id]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0a0a14]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <span className="text-violet-400 text-sm font-medium tracking-widest uppercase">Loading</span>
        </div>
      </div>
    );

  return <>{children}</>;
};

export default AuthProvider;
