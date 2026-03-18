import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageInput from "./components/MessageInput";
import { Music2 } from "lucide-react";

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

const ChatPage = () => {
  const { user } = useAuthStore();
  const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();

  useEffect(() => { if (user) fetchUsers(); }, [fetchUsers, user]);
  useEffect(() => { if (selectedUser) fetchMessages(selectedUser._id); }, [selectedUser, fetchMessages]);

  return (
    <main className="h-full rounded-2xl bg-gradient-to-b from-[#1a0a2e] via-[#0d0d1f] to-[#0a0a18] overflow-hidden">
      <Topbar />
      <div className="grid lg:grid-cols-[280px_1fr] grid-cols-[72px_1fr] h-[calc(100vh-180px)]">
        <UsersList />
        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />
              <ScrollArea className="flex-1 h-[calc(100vh-340px)]">
                <div className="p-4 space-y-3">
                  {messages.map((message) => {
                    const isMe = message.senderId === user?._id;
                    return (
                      <div key={message._id} className={`flex items-end gap-2.5 ${isMe ? "flex-row-reverse" : ""}`}>
                        <Avatar className="size-7 ring-1 ring-white/10 flex-shrink-0">
                          <AvatarImage src={isMe ? user?.imageUrl : selectedUser.imageUrl} />
                          <AvatarFallback className="bg-violet-900 text-xs font-bold text-violet-200">
                            {(isMe ? user?.fullName : selectedUser.fullName)?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`rounded-2xl px-4 py-2.5 max-w-[65%] ${isMe ? "bg-violet-600 rounded-br-sm" : "bg-white/10 rounded-bl-sm"}`}>
                          <p className="text-sm text-white">{message.content}</p>
                          <span className="text-[10px] text-white/40 mt-0.5 block">{formatTime(message.createdAt)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  );
};
export default ChatPage;

const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full gap-4">
    <div className="p-5 bg-violet-500/10 border border-violet-500/20 rounded-3xl">
      <Music2 className="size-10 text-violet-400" />
    </div>
    <div className="text-center">
      <h3 className="text-white font-bold mb-1">Select a conversation</h3>
      <p className="text-gray-500 text-sm">Choose a friend to start chatting</p>
    </div>
  </div>
);
