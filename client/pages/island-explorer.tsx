import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Users, Home, Ship, Plane, Bus, Info, Navigation, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

interface Island {
  id: string;
  name: string;
  atoll: string;
  localName?: string;
  population?: string;
  area?: string;
  hasGuestHouses: boolean;
  numberOfGuestHouses?: string;
  distanceFromMale?: string;
  transportOptions?: any;
  popularActivities?: string[];
  description?: string;
  coordinates?: { lat: number; lng: number };
  isActive: boolean;
}

export default function IslandExplorer() {
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredIsland, setHoveredIsland] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 800, height: 1000 });

  // Fetch islands data
  const { data: islands = [], isLoading } = useQuery<Island[]>({
    queryKey: ['/api/islands', { hasGuestHouses: 'true' }],
  });

  // Filter islands based on search
  const filteredIslands = islands.filter(island => 
    island.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    island.atoll.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update map dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (mapRef.current) {
        const { width } = mapRef.current.getBoundingClientRect();
        setMapDimensions({ 
          width: Math.min(width - 40, 800), 
          height: Math.min((width - 40) * 1.25, 1000) 
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Convert lat/lng to map coordinates
  const latLngToXY = (lat: number, lng: number) => {
    // Maldives spans roughly from -1° to 7° latitude and 72.5° to 74° longitude
    const minLat = -1;
    const maxLat = 7;
    const minLng = 72.5;
    const maxLng = 74;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * mapDimensions.width;
    const y = ((maxLat - lat) / (maxLat - minLat)) * mapDimensions.height;
    
    return { x, y };
  };

  // Group islands by atoll for better visualization
  const atollGroups = islands.reduce((acc, island) => {
    if (!acc[island.atoll]) {
      acc[island.atoll] = [];
    }
    acc[island.atoll].push(island);
    return acc;
  }, {} as Record<string, Island[]>);

  const getTransportIcon = (transport: any) => {
    if (!transport) return null;
    if (transport.domestic_flight) return <Plane className="w-4 h-4" />;
    if (transport.seaplane) return <Plane className="w-4 h-4" />;
    if (transport.speedboat) return <Ship className="w-4 h-4" />;
    if (transport.ferry) return <Ship className="w-4 h-4" />;
    if (transport.bus) return <Bus className="w-4 h-4" />;
    return <Ship className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-niyali-subtle via-white to-niyali-subtle/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 text-niyali-navy">
            Interactive Maldives Island Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore {islands.length} stunning islands across the Maldivian atolls. Click on any island to discover its unique features, guest houses, and activities.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-xl p-2">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-niyali-primary w-5 h-5" />
              <Input
                type="text"
                placeholder="Search islands or atolls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-lg border-0 focus:ring-2 focus:ring-niyali-primary rounded-xl"
                data-testid="input-island-search"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2"
                  data-testid="button-clear-search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {filteredIslands.length < islands.length && searchQuery && (
              <p className="text-center mt-3 text-sm text-gray-600">
                Showing {filteredIslands.length} of {islands.length} islands
              </p>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map View */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-niyali-primary to-niyali-secondary text-white">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Navigation className="w-6 h-6" />
                  Maldives Island Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-gradient-to-b from-sky-50 via-blue-50 to-cyan-50">
                <div 
                  ref={mapRef}
                  className="relative mx-auto"
                  style={{ width: mapDimensions.width, height: mapDimensions.height }}
                >
                  {/* Ocean background */}
                  <svg 
                    width={mapDimensions.width} 
                    height={mapDimensions.height}
                    className="absolute inset-0"
                  >
                    <rect width="100%" height="100%" fill="url(#ocean-gradient)" />
                    <defs>
                      <linearGradient id="ocean-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Atoll labels and boundaries */}
                  {Object.entries(atollGroups).map(([atollName, atollIslands]) => {
                    const avgCoords = atollIslands.reduce((acc, island) => {
                      if (island.coordinates) {
                        acc.lat += island.coordinates.lat;
                        acc.lng += island.coordinates.lng;
                        acc.count++;
                      }
                      return acc;
                    }, { lat: 0, lng: 0, count: 0 });

                    if (avgCoords.count === 0) return null;

                    const centerLat = avgCoords.lat / avgCoords.count;
                    const centerLng = avgCoords.lng / avgCoords.count;
                    const { x, y } = latLngToXY(centerLat, centerLng);

                    return (
                      <g key={atollName}>
                        {/* Atoll boundary circle */}
                        <circle
                          cx={x}
                          cy={y}
                          r="60"
                          fill="none"
                          stroke="rgba(59, 130, 246, 0.3)"
                          strokeWidth="1"
                          strokeDasharray="5,5"
                        />
                        {/* Atoll name */}
                        <text
                          x={x}
                          y={y - 70}
                          textAnchor="middle"
                          className="text-xs font-semibold fill-blue-700"
                        >
                          {atollName}
                        </text>
                      </g>
                    );
                  })}

                  {/* Island markers */}
                  {filteredIslands.map((island) => {
                    if (!island.coordinates) return null;
                    
                    const { x, y } = latLngToXY(island.coordinates.lat, island.coordinates.lng);
                    const isSelected = selectedIsland?.id === island.id;
                    const isHovered = hoveredIsland === island.id;

                    return (
                      <motion.div
                        key={island.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: Math.random() * 0.5 }}
                        className="absolute"
                        style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
                      >
                        <button
                          onClick={() => setSelectedIsland(island)}
                          onMouseEnter={() => setHoveredIsland(island.id)}
                          onMouseLeave={() => setHoveredIsland(null)}
                          className={`relative group transition-all duration-200 ${
                            isSelected ? 'z-20' : 'z-10'
                          }`}
                          data-testid={`button-island-${island.id}`}
                        >
                          {/* Island marker */}
                          <motion.div
                            animate={{
                              scale: isSelected ? 1.5 : isHovered ? 1.2 : 1,
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isSelected 
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-lg' 
                                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-md'
                            }`}
                          >
                            <MapPin className="w-4 h-4 text-white" />
                          </motion.div>

                          {/* Tooltip */}
                          <AnimatePresence>
                            {(isHovered || isSelected) && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-30"
                              >
                                <div className="bg-white rounded-lg shadow-lg p-2 whitespace-nowrap">
                                  <p className="font-semibold text-sm">{island.name}</p>
                                  <p className="text-xs text-gray-500">{island.numberOfGuestHouses} guest houses</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </motion.div>
                    );
                  })}

                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-gray-200">
                    <h3 className="text-sm font-bold mb-3 text-niyali-navy">Map Legend</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md"></div>
                        <span className="text-xs font-medium">Island with Guest Houses</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-md"></div>
                        <span className="text-xs font-medium">Selected Island</span>
                      </div>
                      <div className="flex items-center gap-3 pt-2 border-t">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600">Click to explore</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Island Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {selectedIsland ? (
              <Card className="sticky top-4 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-niyali-primary to-niyali-secondary text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl">{selectedIsland.name}</span>
                    <button
                      onClick={() => setSelectedIsland(null)}
                      className="hover:bg-white/20 rounded-full p-1 transition-colors"
                      data-testid="button-close-details"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </CardTitle>
                  {selectedIsland.localName && (
                    <p className="text-sm opacity-90">{selectedIsland.localName}</p>
                  )}
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {/* Basic Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Atoll:</span>
                      <span className="font-medium">{selectedIsland.atoll}</span>
                    </div>
                    {selectedIsland.population && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <Users className="w-4 h-4" /> Population:
                        </span>
                        <span className="font-medium">{selectedIsland.population}</span>
                      </div>
                    )}
                    {selectedIsland.area && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-medium">{selectedIsland.area} km²</span>
                      </div>
                    )}
                    {selectedIsland.numberOfGuestHouses && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <Home className="w-4 h-4" /> Guest Houses:
                        </span>
                        <Badge variant="secondary">{selectedIsland.numberOfGuestHouses}</Badge>
                      </div>
                    )}
                    {selectedIsland.distanceFromMale && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Distance from Malé:</span>
                        <span className="font-medium">{selectedIsland.distanceFromMale} km</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {selectedIsland.description && (
                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-600">{selectedIsland.description}</p>
                    </div>
                  )}

                  {/* Transport Options */}
                  {selectedIsland.transportOptions && (
                    <div className="pt-3 border-t">
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                        <Navigation className="w-4 h-4" /> Transport Options
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(selectedIsland.transportOptions).map(([key, value]) => {
                          if (!value) return null;
                          const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                          return (
                            <Badge key={key} variant="outline" className="text-xs">
                              {getTransportIcon(selectedIsland.transportOptions)}
                              <span className="ml-1">{label}</span>
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Popular Activities */}
                  {selectedIsland.popularActivities && selectedIsland.popularActivities.length > 0 && (
                    <div className="pt-3 border-t">
                      <h4 className="text-sm font-semibold mb-2">Popular Activities</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedIsland.popularActivities.map((activity, index) => (
                          <Badge key={index} className="text-xs">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-3 border-t space-y-2">
                    <Button 
                      className="w-full"
                      onClick={() => window.location.href = `/guest-houses?island=${selectedIsland.name}`}
                      data-testid="button-view-guesthouses"
                    >
                      View Guest Houses
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = `/booking?island=${selectedIsland.name}`}
                      data-testid="button-book-now"
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Info className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-semibold mb-2">Select an Island</h3>
                  <p className="text-sm text-gray-600">
                    Click on any island marker on the map to view detailed information about guest houses and activities.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Islands:</span>
                  <span className="font-semibold">{islands.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Atolls:</span>
                  <span className="font-semibold">{Object.keys(atollGroups).length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Islands Found:</span>
                  <span className="font-semibold">{filteredIslands.length}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Island Grid (Mobile-friendly list) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-4">All Islands with Guest Houses</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredIslands.map((island, index) => (
              <motion.div
                key={island.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={`cursor-pointer hover:shadow-lg transition-all ${
                    selectedIsland?.id === island.id ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => setSelectedIsland(island)}
                  data-testid={`card-island-${island.id}`}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{island.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{island.atoll}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        <Home className="w-3 h-3 mr-1" />
                        {island.numberOfGuestHouses}
                      </Badge>
                      {island.distanceFromMale && (
                        <span className="text-xs text-gray-500">
                          {island.distanceFromMale} km from Malé
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}