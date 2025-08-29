import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MapPin, Users, Home, Activity, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

interface Island {
  id: string;
  name: string;
  atoll: string;
  local_name?: string;
  population?: string;
  area?: string;
  has_guest_houses: boolean;
  number_of_guest_houses?: string;
  distance_from_male?: string;
  transport_options?: any;
  popular_activities?: string[];
  description?: string;
  coordinates?: { lat: number; lng: number };
  is_active: boolean;
}

export default function Islands() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAtoll, setSelectedAtoll] = useState('all');
  const [testIslands, setTestIslands] = useState<Island[]>([]);

  // Direct fetch as primary method for production
  useEffect(() => {
    fetch('/api/islands')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTestIslands(data);
        }
      })
      .catch(err => console.error('Failed to fetch islands:', err));
  }, []);

  // Fetch islands data
  const { data: islandsData, isLoading } = useQuery<Island[]>({
    queryKey: ['/api/islands'],
    staleTime: 0,
    refetchOnMount: true,
    gcTime: 0,
  });

  // Use direct fetch as primary, React Query as fallback
  const islands = testIslands.length > 0 ? testIslands : (islandsData || []);
  const islandsArray = Array.isArray(islands) ? islands : [];

  // Get unique atolls for filtering
  const atolls = ['all', ...Array.from(new Set(islandsArray.map(island => island.atoll)))];

  // Filter islands based on search and atoll selection
  const filteredIslands = islandsArray.filter(island => {
    const matchesSearch = island.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          island.atoll.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAtoll = selectedAtoll === 'all' || island.atoll === selectedAtoll;
    return matchesSearch && matchesAtoll;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-niyali-subtle to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-niyali-navy mb-4">
            Explore Maldivian Islands
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover {islandsArray.length} beautiful islands across the Maldivian atolls, 
            each offering unique experiences and authentic local culture
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search islands by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  data-testid="input-search-islands"
                />
              </div>
            </div>

            {/* Atoll Filter */}
            <div>
              <label htmlFor="atoll-filter" className="sr-only">Filter by Atoll</label>
              <select
                id="atoll-filter"
                value={selectedAtoll}
                onChange={(e) => setSelectedAtoll(e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-niyali-primary"
                data-testid="select-atoll-filter"
              >
                {atolls.map(atoll => (
                  <option key={atoll} value={atoll}>
                    {atoll === 'all' ? 'All Atolls' : atoll}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Islands Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIslands.map(island => (
              <Card key={island.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <CardHeader className="pb-4 bg-gradient-to-r from-niyali-primary/5 to-niyali-secondary/5">
                  <CardTitle className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-niyali-navy group-hover:text-niyali-primary transition-colors">
                        {island.name}
                      </h3>
                      {island.local_name && (
                        <p className="text-sm text-gray-500 mt-1">{island.local_name}</p>
                      )}
                    </div>
                    <Badge variant="outline" className="bg-white">
                      {island.atoll}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {island.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {island.description}
                    </p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    {island.population && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Population: {island.population}</span>
                      </div>
                    )}
                    
                    {island.has_guest_houses && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Home className="w-4 h-4" />
                        <span>{island.number_of_guest_houses || 'Multiple'} Guest Houses</span>
                      </div>
                    )}
                    
                    {island.distance_from_male && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{island.distance_from_male} km from Malé</span>
                      </div>
                    )}
                  </div>

                  {/* Transport Options */}
                  {island.transport_options && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {island.transport_options.ferry && (
                        <Badge className="bg-blue-100 text-blue-700">Ferry</Badge>
                      )}
                      {island.transport_options.speedboat && (
                        <Badge className="bg-cyan-100 text-cyan-700">Speedboat</Badge>
                      )}
                      {island.transport_options.seaplane && (
                        <Badge className="bg-purple-100 text-purple-700">Seaplane</Badge>
                      )}
                    </div>
                  )}

                  {/* Popular Activities */}
                  {island.popular_activities && island.popular_activities.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Popular Activities:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {island.popular_activities[0].split(',').slice(0, 3).map((activity, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {activity.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t">
                    <Link to="/island-explorer" className="flex-1">
                      <Button variant="outline" className="w-full" data-testid={`button-view-map-${island.id}`}>
                        View on Map
                      </Button>
                    </Link>
                    {island.has_guest_houses && (
                      <Link to={`/guest-houses?island=${island.name}`} className="flex-1">
                        <Button className="w-full bg-niyali-gradient text-white" data-testid={`button-view-guesthouses-${island.id}`}>
                          Guest Houses
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredIslands.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No islands found matching your search criteria.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}