import DownloadCTA from "@/components/DownloadCTA";
import FAQ from "@/components/FAQ";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="container mx-auto max-w-6xl px-2 md:px-4 xl:px-6">
      <div className="pt-40" />
      <HeroSection />
      <div className="pt-20" />
      <FeaturesSection />
      <div className="pt-30" />
      <FAQ />
      <div className="pt-30" />
      <DownloadCTA />
      <div className="pb-10" />
    </main>
  );
}
