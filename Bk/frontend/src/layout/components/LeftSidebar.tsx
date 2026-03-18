import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { HomeIcon, Library, MessageCircle, Waves } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();
  const { user } = useAuthStore();
  const location = useLocation();

  useEffect(() => { fetchAlbums(); }, [fetchAlbums]);

  const navItem = (to: string, icon: React.ReactNode, label: string) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium group ${
          active
            ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
            : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
        }`}
      >
        <span className={active ? "text-violet-400" : "group-hover:text-gray-300"}>{icon}</span>
        <span className="hidden md:block">{label}</span>
      </Link>
    );
  };

  return (
    <div className="h-full flex flex-col gap-2 p-2">
      {/* Nav */}
      <div className="rounded-2xl bg-[#0f0f1e] border border-white/5 p-3">
        <div className="space-y-1">
          {navItem("/", <HomeIcon className="size-4" />, "Home")}
          {user && navItem("/chat", <MessageCircle className="size-4" />, "Messages")}
        </div>
      </div>

      {/* Library */}
      <div className="flex-1 rounded-2xl bg-[#0f0f1e] border border-white/5 p-3 overflow-hidden">
        <div className="flex items-center gap-2 px-1 mb-4">
          <Library className="size-4 text-gray-500" />
          <span className="hidden md:block text-xs font-bold text-gray-500 uppercase tracking-widest">Library</span>
        </div>

        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-1">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="size-10 rounded-lg flex-shrink-0 object-cover ring-1 ring-white/10"
                  />
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="text-white text-sm font-medium truncate group-hover:text-violet-300 transition-colors">
                      {album.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{album.artist}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
