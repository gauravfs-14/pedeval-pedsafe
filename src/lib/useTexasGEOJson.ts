import React from "react";
import { FeatureCollection } from "geojson";

export default function useTexasGEOJson() {
  const [texasGEOJson, setTexasGEOJson] =
    React.useState<FeatureCollection | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchTexasGEOJson() {
      try {
        const response = await fetch(
          "https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/Texas_State_Boundary/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: FeatureCollection = await response.json();
        setTexasGEOJson(data);
      } catch (error) {
        console.error("Failed to fetch Texas GEOJSON:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTexasGEOJson();
  }, []);

  return { texasGEOJson, loading };
}
