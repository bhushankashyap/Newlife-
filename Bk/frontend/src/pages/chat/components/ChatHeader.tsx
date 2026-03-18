import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useChatStore();
  if (!selectedUser) return null;
  const isOnline = onlineUsers.has(selectedUser._id);

  return (
    <div className="p-4 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="size-10 ring-1 ring-white/10">
            <AvatarImage src={selectedUser.imageUrl} />
            <AvatarFallback className="bg-violet-900 text-violet-200 font-bold">{selectedUser.fullName[0]}</AvatarFallback>
          </Avatar>
          <div className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#0d0d1f] ${isOnline ? "bg-emerald-400" : "bg-gray-600"}`} />
        </div>
        <div>
          <h2 className="text-white font-semibold text-sm">{selectedUser.fullName}</h2>
          <p className="text-xs text-gray-500">{isOnline ? "● Online" : "○ Offline"}</p>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
