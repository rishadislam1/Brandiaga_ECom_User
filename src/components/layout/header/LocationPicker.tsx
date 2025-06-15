
import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

/**
 * Type definition for saved location data
 */
type SavedLocation = {
  name: string;      // Location name (e.g., "United States")
  isDefault: boolean; // Whether this is the default location
};

/**
 * Initial locations available in the location picker
 */


/**
 * Amazon-style location picker component
 * Allows users to select their delivery location
 */
const LocationPicker: React.FC = () => {
  const [initialLocations, setInitialLocations] = useState<SavedLocation[]>([
    { name: "United States", isDefault: true },
    { name: "Canada", isDefault: false },
    { name: "United Kingdom", isDefault: false },
  ]);

  // State for dropdown visibility
  const [show, setShow] = useState(false);
  // State for currently selected location
  const [currentLocation, setCurrentLocation] = useState(() => {
    return localStorage.getItem("userLocation") || "United States";
  });


  // State for all saved locations
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>(() => {
    const sl = localStorage.getItem("savedLocations");
    return sl ? JSON.parse(sl) : [...initialLocations];
  });

  // State for new location input
  const [newLocation, setNewLocation] = useState("");

  // Load saved location from localStorage
  useEffect(() => {
    const l = localStorage.getItem("userLocation");
    const sl = localStorage.getItem("savedLocations");
    if (l) setCurrentLocation(l);
    if (sl) setSavedLocations(JSON.parse(sl));
  }, []);

  // Save current location to localStorage when changed
  useEffect(() => {
    localStorage.setItem("userLocation", currentLocation);
  }, [currentLocation]);

  // Save all locations to localStorage when changed
  useEffect(() => {
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }, [savedLocations]);

  /**
   * Handle location detection (simulated)
   */
  const detectCurrentLocation = () => {
    toast({ title: "Detecting location...", description: "Please wait while we detect your location." });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            )
                .then((response) => response.json())
                .then((data) => {
                  const locationName = data.display_name || "Unknown Location";

                  setCurrentLocation(locationName);

                  const newLoc = { name: locationName, isDefault: false };

                  if (!savedLocations.some(loc => loc.name === locationName)) {
                    setSavedLocations(prev => [...prev, newLoc]);
                  }

                  if (!initialLocations.some(loc => loc.name === locationName)) {
                    setInitialLocations(prev => [...prev, newLoc]); // <-- Add it here too
                  }

                  setShow(false);
                  toast({
                    title: "Location Detected",
                    description: `Your delivery location is now set to ${locationName}`,
                  });
                })
                .catch((error) => {
                  console.error("Reverse geocoding error:", error);
                  toast({ title: "Error", description: "Could not determine your address." });
                });
          },
      );
    } else {
      toast({ title: "Not Supported", description: "Geolocation is not supported by your browser." });
    }
  };


  /**
   * Handle adding a new location
   */
  const handleAdd = () => {
    if (!newLocation.trim()) {
      toast({ title: "Location empty", description: "Please enter a location", variant: "destructive" });
      return;
    }
    setSavedLocations(prev => [...prev, { name: newLocation, isDefault: false }]);
    setCurrentLocation(newLocation);
    setNewLocation("");
    setShow(false);
    toast({ title: "Location Added", description: `Delivery location is now set to ${newLocation}` });
  };

  /**
   * Handle selecting an existing location
   */
  const handleSelect = (location: string) => {
    setCurrentLocation(location);
    setShow(false);
    toast({ title: "Location Updated", description: `Delivery location is now set to ${location}` });
  };

  return (
    <div className="relative">
      {/* Location display trigger */}
      <div
        className="flex items-center gap-1 cursor-pointer group hover:bg-gray-200/30 rounded-sm px-2 py-1"
        onClick={() => setShow(!show)}
        tabIndex={0}
      >
        <MapPin className="h-4 w-4 text-brandiaga-yellow-400" />
        <div className="flex flex-col flex-shrink min-w-0">
          <span className="text-xs text-gray-400 whitespace-nowrap truncate">Deliver to</span>
          <span className="text-sm font-bold text-white group-hover:text-brandiaga-yellow-400 transition">{currentLocation}</span>
        </div>
        <span className="ml-1 text-xs text-gray-400">▼</span>
      </div>

      {/* Location picker dropdown */}
      {show && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg p-4 rounded-md w-80 z-50 text-gray-900 animate-fade-in">
          <h3 className="font-semibold mb-2 border-b pb-1">Choose your location</h3>
          {/* Saved locations list */}
          <ul className="mb-3 space-y-1 max-h-28 overflow-y-auto">
            {savedLocations.map((location, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-1 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleSelect(location.name)}
              >
                <span className="text-sm">{location.name}</span>
                {location.isDefault && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Default</span>
                )}
              </li>
            ))}
          </ul>
          {/* Add new location input */}
          <div className="flex gap-2 mb-2">
            <Input
              type="text"
              placeholder="Enter city, state or zip"
              className="text-sm"
              value={newLocation}
              onChange={e => setNewLocation(e.target.value)}
            />
            <Button size="sm" className="bg-brandiaga-yellow-400 text-gray-900" onClick={handleAdd}>
              Add
            </Button>
          </div>
          {/* Auto-detect location button */}
          <Button
            size="sm"
            variant="outline"
            className="w-full flex items-center gap-2 justify-center mb-2"
            onClick={detectCurrentLocation}
          >
            <MapPin className="h-3 w-3" />Detect my location
          </Button>
          {/* Cancel button */}
          <Button size="sm" variant="ghost" className="w-full" onClick={() => setShow(false)}>Cancel</Button>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
