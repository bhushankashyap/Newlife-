import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useAuthStore } from "@/stores/useAuthStore";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const HomePage = () => {
  const { fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, isLoading, madeForYouSongs, featuredSongs, trendingSongs } = useMusicStore();
  const { initializeQueue } = usePlayerStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
      initializeQueue([...featuredSongs, ...madeForYouSongs, ...trendingSongs]);
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  return (
    <main className="rounded-2xl overflow-hidden h-full bg-gradient-to-b from-[#1a0a2e] via-[#0d0d1f] to-[#0a0a18]">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-5 sm:p-7">
          <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {getGreeting()}{user ? `, ${user.fullName.split(" ")[0]}` : ""}
            </h1>
            <p className="text-gray-500 text-sm mt-1">What do you feel like listening to today?</p>
          </div>
          <FeaturedSection />
          <div className="space-y-10 mt-8">
            <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
            <SectionGrid title="Trending Now" songs={trendingSongs} isLoading={isLoading} />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
export default HomePage;
