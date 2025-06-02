"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeatureCollection } from "geojson";
import { loadProjectsData } from "@/lib/loadProjectsData";
import { loadCrashData } from "@/lib/loadCrashData";
import Loading from "./loading";

const MapRender = dynamic(() => import("@/components/MapRender"), {
  ssr: false,
});

export default function MapSection() {
  const [activeTab, setActiveTab] = useState("projects");
  const [projectData, setProjectData] = useState<FeatureCollection>();
  const [crashData, setCrashData] = useState<FeatureCollection>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeTab === "projects" && !projectData) {
      loadProjectsData()
        .then(setProjectData)
        .then(() => setIsLoading(false));
    } else if (activeTab === "crashes" && !crashData) {
      loadCrashData()
        .then(setCrashData)
        .then(() => setIsLoading(false));
    }
  }, [activeTab, projectData, crashData]);

  return (
    <Tabs defaultValue="projects" onValueChange={setActiveTab}>
      <TabsList className="mx-auto">
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="crashes">Crashes</TabsTrigger>
      </TabsList>
      <div className="text-center mb-4">
        Select a tab to view the projects/ crashes. Click on a point to see more
        details.
      </div>
      <TabsContent value="projects">
        <div className="h-[calc(100vh-200px)] w-full rounded-2xl overflow-hidden shadow-lg">
          {activeTab === "projects" && projectData && (
            <MapRender featureCollection={projectData} />
          )}
          {isLoading && <Loading />}
        </div>
      </TabsContent>

      <TabsContent value="crashes">
        <div className="h-[calc(100vh-200px)] w-full rounded-2xl overflow-hidden shadow-lg">
          {activeTab === "crashes" && crashData && (
            <MapRender featureCollection={crashData} />
          )}
          {isLoading && <Loading />}
        </div>
      </TabsContent>
    </Tabs>
  );
}
