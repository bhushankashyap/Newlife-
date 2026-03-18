import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Send } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuthStore();
  const { selectedUser, sendMessage } = useChatStore();

  const handleSend = () => {
    if (!selectedUser || !user || !newMessage.trim()) return;
    sendMessage(selectedUser._id, user._id, newMessage.trim());
    setNewMessage("");
  };

  return (
    <div className="p-4 border-t border-white/5">
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus-visible:ring-violet-500/30 focus-visible:border-violet-500/50"
        />
        <button
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
};
export default MessageInput;
