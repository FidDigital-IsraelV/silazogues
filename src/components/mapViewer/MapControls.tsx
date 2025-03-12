
import React from "react";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { Map as LeafletMap } from "leaflet";

interface MapControlsProps {
  mapRef: React.MutableRefObject<LeafletMap | null>;
}

const MapControls = ({ mapRef }: MapControlsProps) => {
  return (
    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
      <button 
        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100" 
        onClick={() => mapRef.current?.zoomIn()}
        aria-label="Zoom in"
      >
        <ZoomIn size={20} className="text-gray-700" />
      </button>
      <button 
        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100" 
        onClick={() => mapRef.current?.zoomOut()}
        aria-label="Zoom out"
      >
        <ZoomOut size={20} className="text-gray-700" />
      </button>
      <button 
        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100" 
        onClick={() => mapRef.current?.setView([-2.740947, -78.848823], 12)}
        aria-label="Reset view"
      >
        <Maximize size={20} className="text-gray-700" />
      </button>
    </div>
  );
};

export default MapControls;
