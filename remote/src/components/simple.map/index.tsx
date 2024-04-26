import useMap from "./useMap";

type Props = {
  geojson?: GeoJSON;
};

export default function MapboxGL({ geojson }: Props) {
  const mapContainer = useMap({ geojson });
  return (
    <div className="h-full relative">
      <div ref={mapContainer} />
    </div>
  );
}
type GeoJSON = {
  type: string;
  features: Feature[];
};

type Feature = {
  type: string;
  properties: { [key: string]: unknown };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
};
