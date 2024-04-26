import { useRef, useEffect, useCallback } from "react";
import * as mapboxgl from "mapbox-gl";
const default_center = [-86.2463, 45.9578];
const default_zoom = 4;

export default function useMap({ geojson }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const loadMapbox = useCallback(() => {
    map.current.addSource("projects", {
      type: "geojson",
      data: geojson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });

    map.current.addLayer({
      id: "clusters",
      type: "circle",
      source: "projects",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6",
          100,
          "#f1f075",
          750,
          "#f28cb1",
        ],
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
      },
    });

    map.current.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "projects",
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
    });

    map.current.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "projects",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 10,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
    });

    const secondsPerRevolution = 120;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;
    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
      const zoom = map.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.current.getCenter();
        center.lng -= distancePerSecond;
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    map.current.on("mousedown", () => {
      userInteracting = true;
    });

    map.current.on("mouseup", () => {
      userInteracting = false;
      spinGlobe();
    });

    map.current.on("dragend", () => {
      userInteracting = false;
      spinGlobe();
    });
    map.current.on("pitchend", () => {
      userInteracting = false;
      spinGlobe();
    });
    map.current.on("rotateend", () => {
      userInteracting = false;
      spinGlobe();
    });

    map.current.on("moveend", () => {
      spinGlobe();
    });

    map.current.on("mouseenter", "clusters", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });
    map.current.on("mouseleave", "clusters", () => {
      map.current.getCanvas().style.cursor = "";
    });
  }, [geojson]);

  useEffect(() => {
    const [first] = geojson?.features || [];
    const center = first?.geometry?.coordinates ?? default_center;
    const token = import.meta.env.VITE_MAPBOX_KEY;
    if (!map.current && token) {
      try {
        map.current = new mapboxgl.Map({
          accessToken: token,
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/light-v11",
          center,
          zoom: default_zoom,
        });
      } catch (error) {
        console.error("Failed to initialize Mapbox:", error);
      }
    }
    map.current.on("load", loadMapbox);

    return () => {
      map.current.off("load", loadMapbox);
    };
  }, [geojson, loadMapbox]);

  return mapContainer;
}
