import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Music, ShieldX } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();
  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && !isLoading)
    return (
      <div className="min-h-screen bg-[#06060f] flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShieldX className="size-14 text-red-400 mx-auto" />
          <h2 className="text-white text-xl font-bold">Access Denied</h2>
          <p className="text-gray-500 text-sm">You don't have admin privileges.</p>
          <Link to="/" className="inline-block px-5 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-bold hover:bg-violet-500 transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0a2e] via-[#0d0d1f] to-[#06060f] text-white p-8">
      <Header />
      <DashboardStats />
      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-white/5 border border-white/10 rounded-xl">
          <TabsTrigger value="songs" className="data-[state=active]:bg-violet-600 rounded-lg gap-2">
            <Music className="size-4" /> Songs
          </TabsTrigger>
          <TabsTrigger value="albums" className="data-[state=active]:bg-violet-600 rounded-lg gap-2">
            <Album className="size-4" /> Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value="songs"><SongsTabContent /></TabsContent>
        <TabsContent value="albums"><AlbumsTabContent /></TabsContent>
      </Tabs>
    </div>
  );
};
export default AdminPage;
