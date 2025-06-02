import MapSection from "./map-section";

export default function ToolPage() {
  return (
    <main className="container mx-auto max-w-6xl px-2 md:px-4 xl:px-6">
      <div className="pt-40" />
      <div className="text-center mb-10">
        <h2 className="relative text-4xl font-extrabold tracking-tight text-foreground mb-4 after:content-[''] after:block after:mx-auto after:mt-3 after:h-[3px] after:w-24 after:bg-gradient-to-r after:from-primary after:to-accent-foreground/70 after:rounded-full">
          Explore Our Tool
        </h2>
        <p className="text-md text-muted-foreground max-w-2xl mx-auto">
          PEDEVAL is a powerful tool designed to help you explore pedestrian
          projects and crash data in Texas. It provides an interactive,
          map-centric interface that allows you to visualize and analyze data
          effectively.
        </p>
      </div>
      <MapSection />
    </main>
  );
}
