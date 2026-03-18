import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const FriendsActivity = () => {
  const { users, fetchUsers, onlineUsers, userActivities } = useChatStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  return (
    <div className="h-full bg-[#0f0f1e] rounded-2xl border border-white/5 flex flex-col">
      <div className="p-4 flex items-center gap-2 border-b border-white/5">
        <Users className="size-4 text-gray-500" />
        <h2 className="font-bold text-sm text-gray-300 uppercase tracking-widest">Friends</h2>
      </div>

      {!user ? (
        <LoginPrompt />
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-1">
            {users.map((u) => {
              const activity = userActivities.get(u._id);
              const isPlaying = activity && activity !== "Idle";
              const isOnline = onlineUsers.has(u._id);

              return (
                <div key={u._id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="relative flex-shrink-0">
                    <Avatar className="size-9 ring-1 ring-white/10">
                      <AvatarImage src={u.imageUrl} alt={u.fullName} />
                      <AvatarFallback className="bg-violet-900 text-violet-200 text-xs font-bold">
                        {u.fullName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0f0f1e] ${isOnline ? "bg-emerald-400" : "bg-gray-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white text-sm font-medium truncate">{u.fullName}</span>
                      {isPlaying && <Music className="size-3 text-violet-400 flex-shrink-0" />}
                    </div>
                    {isPlaying ? (
                      <div className="mt-0.5">
                        <p className="text-xs text-gray-300 truncate">{activity!.replace("Playing ", "").split(" by ")[0]}</p>
                        <p className="text-xs text-gray-500 truncate">{activity!.split(" by ")[1]}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-600 mt-0.5">{isOnline ? "Online" : "Offline"}</p>
                    )}
                  </div>
                </div>
              );
            })}
            {users.length === 0 && (
              <p className="text-center text-gray-600 text-xs py-8">No other users yet</p>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

const LoginPrompt = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-4">
    <div className="relative">
      <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur-xl opacity-30 animate-pulse" />
      <div className="relative bg-violet-500/10 border border-violet-500/20 rounded-full p-4">
        <HeadphonesIcon className="size-7 text-violet-400" />
      </div>
    </div>
    <div className="space-y-1.5">
      <h3 className="text-sm font-bold text-white">See What Friends Are Playing</h3>
      <p className="text-xs text-gray-500 max-w-[180px]">Sign in to see what your friends are listening to</p>
    </div>
    <Link to="/auth" className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 transition-colors">
      Sign In
    </Link>
  </div>
);

export default FriendsActivity;
