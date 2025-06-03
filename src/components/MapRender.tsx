/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import Map, {
  Layer,
  Marker,
  NavigationControl,
  Popup,
  Source,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { FeatureCollection, GeoJsonProperties, Point } from "geojson";
import Image from "next/image";
import Supercluster from "supercluster";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import useTexasGEOJson from "@/lib/useTexasGEOJson";
import * as turf from "@turf/turf";
import { cn } from "@/lib/utils";

interface MapRenderProps {
  initialViewState?: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  mapStyle?: string;
  style?: React.CSSProperties;
  featureCollection: FeatureCollection;
}

interface PopupContent {
  coordinates: [number, number];
  properties: GeoJsonProperties;
}

export default function MapRender({
  initialViewState = {
    longitude: -97.7431,
    latitude: 31.2672,
    zoom: 5,
  },
  mapStyle = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  style,
  featureCollection,
}: MapRenderProps) {
  const mapRef = React.useRef<any>(null);
  const [zoom, setZoom] = React.useState(initialViewState.zoom);
  const [bounds, setBounds] = React.useState<[number, number, number, number]>([
    -180, -85, 180, 85,
  ]);
  const [clusters, setClusters] = React.useState<any[]>([]);
  const [showPopup, setShowPopup] = React.useState(false);
  const [popupContent, setPopupContent] = React.useState<PopupContent>();
  // const [hoveredClusterId, setHoveredClusterId] = React.useState<number | null>(
  //   null
  // );
  const [clusterHullGeoJson, setClusterHullGeoJson] =
    React.useState<FeatureCollection | null>(null);

  const { loading, texasGEOJson } = useTexasGEOJson();
  // Prepare points
  const points = React.useMemo(() => {
    return featureCollection.features
      .filter((f) => f.geometry.type === "Point")
      .map((f) => ({
        type: "Feature",
        geometry: f.geometry,
        properties: f.properties ?? {}, // Ensure non-null
      })) as GeoJSON.Feature<Point, { [key: string]: any }>[];
  }, [featureCollection]);

  // Set up Supercluster
  const index = React.useMemo(() => {
    const supercluster = new Supercluster({
      radius: 60,
      maxZoom: 16,
    });
    supercluster.load(points);
    return supercluster;
  }, [points]);

  // Update clusters when zoom/bounds change
  React.useEffect(() => {
    const clusters = index.getClusters(
      [...bounds, 0, 0] as [number, number, number, number, number, number],
      Math.round(zoom)
    );
    setClusters(clusters);
  }, [index, bounds, zoom]);

  const handleMove = () => {
    if (!mapRef.current) return;
    const b = mapRef.current.getBounds();
    setBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]);
    setZoom(mapRef.current.getZoom());
  };

  return (
    <Map
      initialViewState={initialViewState}
      style={{ width: "100%", height: "100%", overflow: "hidden", ...style }}
      mapStyle={mapStyle}
      ref={mapRef}
      onMoveEnd={handleMove}
    >
      {clusters.map((cluster, idx) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const pointCount = cluster.properties.point_count;

        // If it's a cluster
        if (cluster.properties.cluster) {
          return (
            <Marker
              key={`cluster-${idx}`}
              longitude={longitude}
              latitude={latitude}
              anchor="center"
              onClick={() => {
                const expansionZoom = Math.min(
                  index.getClusterExpansionZoom(cluster.id),
                  18
                );
                mapRef.current?.flyTo({
                  center: [longitude, latitude],
                  zoom: expansionZoom,
                  duration: 800,
                });
              }}
            >
              <div
                className={cn(
                  `w-10 h-10 rounded-full border-4 text-white text-sm font-bold flex items-center justify-center shadow-md transition-transform transform hover:scale-110 cursor-pointer`,
                  pointCount > 500
                    ? "bg-red-500/50 border-red-200"
                    : pointCount > 200
                    ? "bg-orange-500/50 border-orange-200"
                    : pointCount > 100
                    ? "bg-purple-500/50 border-purple-200"
                    : pointCount > 50
                    ? "bg-yellow-500/50 border-yellow-200"
                    : "bg-blue-500/50 border-blue-200"
                )}
                onMouseEnter={() => {
                  // setHoveredClusterId(cluster.id);
                  const leaves = index.getLeaves(cluster.id, Infinity);
                  const points = leaves.map((leaf) =>
                    turf.point((leaf.geometry as Point).coordinates)
                  );
                  const fc = turf.featureCollection(points);
                  const hull = turf.convex(fc);
                  if (hull) {
                    setClusterHullGeoJson({
                      type: "FeatureCollection",
                      features: [hull],
                    });
                  }
                }}
                onMouseLeave={() => {
                  // setHoveredClusterId(null);
                  setClusterHullGeoJson(null);
                }}
              >
                {cluster.properties.point_count_abbreviated}
              </div>
            </Marker>
          );
        }

        // Otherwise a single point
        return (
          <Marker
            key={`point-${idx}`}
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
            onClick={() => {
              setPopupContent({
                coordinates: [longitude, latitude],
                properties: cluster.properties,
              });
              setShowPopup(true);
              mapRef.current?.flyTo({
                center: [longitude, latitude],
                duration: 1000,
                essential: true,
              });
            }}
          >
            <Image
              src="/map-pin.png"
              alt="Marker"
              width={30}
              height={30}
              className="cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
            />
          </Marker>
        );
      })}
      {clusterHullGeoJson && (
        <Source id="cluster-hull" type="geojson" data={clusterHullGeoJson}>
          <Layer
            id="cluster-hull-layer"
            type="fill"
            paint={{
              "fill-color": "#5b9bd5",
              "fill-opacity": 0.2,
            }}
          />
          <Layer
            id="cluster-hull-outline"
            type="line"
            paint={{
              "line-color": "#5b9bd5",
              "line-width": 2,
            }}
          />
        </Source>
      )}

      {showPopup && popupContent && (
        <Popup
          longitude={popupContent.coordinates[0]}
          latitude={popupContent.coordinates[1]}
          closeButton={false}
          closeOnClick={false}
          onClose={() => setShowPopup(false)}
          anchor="top"
        >
          <div className="text-sm relative">
            <Button
              onClick={() => setShowPopup(false)}
              className="absolute top-1 right-1 p-1 focus:outline-none"
              aria-label="Close"
              variant={"ghost"}
            >
              <X className="h-4 w-4" />
            </Button>
            <h3 className="font-semibold mb-2">
              {popupContent.properties?.name || "Location Details"}
            </h3>
            <ul className="list-disc pl-4 max-h-60 overflow-y-auto">
              {Object.entries(popupContent.properties || {}).map(
                ([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value?.toString() || "N/A"}
                  </li>
                )
              )}
            </ul>
          </div>
        </Popup>
      )}
      {texasGEOJson && !loading && (
        <Source id="texas-boundary" type="geojson" data={texasGEOJson}>
          <Layer
            id="texas-boundary-layer"
            type="line"
            paint={{
              "line-color": "#FF0000",
              "line-width": 2,
            }}
          />
        </Source>
      )}
      <NavigationControl position="top-left" />
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={() => {
            mapRef.current?.flyTo({
              center: [initialViewState.longitude, initialViewState.latitude],
              zoom: initialViewState.zoom,
              duration: 800,
            });
          }}
          variant="outline"
          className="cursor-pointer"
        >
          Reset View
        </Button>
      </div>
    </Map>
  );
}
