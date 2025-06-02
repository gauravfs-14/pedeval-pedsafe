// src/lib/loadProjectsData.ts
import { fetchCompressedJSON } from "@/lib/fetchCompressedJSON";
import type { FeatureCollection } from "geojson";

export async function loadProjectsData(): Promise<FeatureCollection> {
  return await fetchCompressedJSON(
    "https://raw.githubusercontent.com/gauravfs-14/pedeval-pedsafe/main/src/data/txdot_projects.json.gz"
  );
}
