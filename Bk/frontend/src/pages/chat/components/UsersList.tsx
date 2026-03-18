import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";

const UsersList = () => {
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore();

  return (
    <div className="border-r border-white/5">
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-1 p-3">
          {isLoading ? (
            <UsersListSkeleton />
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center justify-center lg:justify-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                  selectedUser?._id === user._id
                    ? "bg-violet-500/15 border border-violet-500/20"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <Avatar className="size-9 ring-1 ring-white/10">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback className="bg-violet-900 text-violet-200 text-xs font-bold">{user.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-[#0d0d1f] ${onlineUsers.has(user._id) ? "bg-emerald-400" : "bg-gray-600"}`} />
                </div>
                <span className="font-medium text-sm text-white truncate hidden lg:block">{user.fullName}</span>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
export default UsersList;
