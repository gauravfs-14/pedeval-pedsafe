import pako from "pako";
import type { FeatureCollection } from "geojson";

/**
 * Fetches a compressed JSON file from the given URL, decompresses it using pako,
 * and returns the parsed JSON object.
 *
 * @param {string} url - The URL of the compressed JSON file.
 * @returns {Promise<any>} - A promise that resolves to the parsed JSON object.
 */
export async function fetchCompressedJSON(
  url: string
): Promise<FeatureCollection> {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const decompressed = pako.ungzip(new Uint8Array(buffer), { to: "string" });
  return JSON.parse(decompressed);
}
