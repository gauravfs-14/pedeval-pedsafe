// src/lib/loadCrashData.ts
import { fetchCompressedJSON } from "@/lib/fetchCompressedJSON";
import type { FeatureCollection } from "geojson";

export async function loadCrashData(): Promise<FeatureCollection> {
  return await fetchCompressedJSON(
    "https://raw.githubusercontent.com/gauravfs-14/pedeval-pedsafe/main/src/data/crash_data.json.gz"
  );
}
