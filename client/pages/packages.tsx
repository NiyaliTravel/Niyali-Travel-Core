import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, Check, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Packages() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [durationFilter, setDurationFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("any");
  const [testPackages, setTestPackages] = useState<any[]>([]);

  // Direct fetch as primary method for production
  useEffect(() => {
    fetch('/api/packages')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTestPackages(data);
        }
      })
      .catch(err => console.error('Failed to fetch packages:', err));
  }, []);

  const { data: packagesData, isLoading } = useQuery({
    queryKey: ['/api/packages'],
    staleTime: 0,
    refetchOnMount: true,
    gcTime: 0,
  });

  // Use direct fetch as primary, React Query as fallback
  const packages = testPackages.length > 0 ? testPackages : (packagesData || []);
  const packagesArray = Array.isArray(packages) ? packages : [];

  const { data: guestHouses } = useQuery({
    queryKey: ['/api/guest-houses'],
  });

  const filteredPackages = packagesArray.filter((pkg: any) => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDuration = durationFilter === "all" || 
                           (durationFilter === "short" && pkg.duration <= 3) ||
                           (durationFilter === "medium" && pkg.duration >= 4 && pkg.duration <= 5) ||
                           (durationFilter === "long" && pkg.duration >= 6);
    
    const price = parseFloat(pkg.price);
    const matchesPrice = priceRange === "any" ||
                        (priceRange === "budget" && price <= 500) ||
                        (priceRange === "mid" && price > 500 && price <= 1000) ||
                        (priceRange === "premium" && price > 1000);
    
    return matchesSearch && matchesDuration && matchesPrice;
  });

  const getGuestHouseName = (guestHouseIds: string[]) => {
    if (!guestHouseIds || guestHouseIds.length === 0 || !guestHouses) return "Multiple Locations";
    const guestHouse = (guestHouses as any[])?.find((gh: any) => gh.id === guestHouseIds[0]);
    return guestHouse?.name || "Guest House";
  };

  const getDurationText = (nights: number) => {
    const days = nights + 1;
    return `${days} Days / ${nights} Nights`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-50 to-sky-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-niyali-navy mb-4">Curated Travel Experiences</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Discover our handpicked experiences combining accommodation, activities, and authentic Maldivian adventures. 
              All packages include transfers and daily breakfast.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                data-testid="input-search-packages"
              />
            </div>
            
            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-duration">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="short">3 nights or less</SelectItem>
                <SelectItem value="medium">4-5 nights</SelectItem>
                <SelectItem value="long">6+ nights</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-price">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Price</SelectItem>
                <SelectItem value="budget">Under $500</SelectItem>
                <SelectItem value="mid">$500 - $1000</SelectItem>
                <SelectItem value="premium">Over $1000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="mb-4 text-gray-600">
            Found {filteredPackages?.length || 0} packages
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages?.map((pkg: any) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-teal-400 to-sky-400 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white text-center px-4">
                      {pkg.name}
                    </h3>
                  </div>
                  {pkg.featured && (
                    <Badge className="absolute top-4 right-4 bg-yellow-400 text-gray-900">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{getGuestHouseName(pkg.guestHouseIds)}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {pkg.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{getDurationText(pkg.duration)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Max {pkg.maxGuests} guests</span>
                    </div>
                  </div>

                  {/* Inclusions preview */}
                  {pkg.inclusions && pkg.inclusions.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                      <div className="space-y-1">
                        {pkg.inclusions.slice(0, 3).map((item: string, index: number) => (
                          <div key={index} className="flex items-start gap-1">
                            <Check className="h-3 w-3 text-teal-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-gray-600 line-clamp-1">{item}</span>
                          </div>
                        ))}
                        {pkg.inclusions.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{pkg.inclusions.length - 3} more inclusions
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Exclusions preview */}
                  {pkg.exclusions && pkg.exclusions.length > 0 && (
                    <div className="text-xs text-gray-500 mb-2">
                      <span className="font-semibold">Optional add-ons available</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-niyali-navy">
                        ${parseFloat(pkg.price).toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-sm">/package</span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/packages/${pkg.id}`}>
                        <Button size="sm" variant="outline" data-testid={`button-details-${pkg.id}`}>
                          Details
                        </Button>
                      </Link>
                      <Button size="sm" className="niyali-gradient text-white" data-testid={`button-book-${pkg.id}`} onClick={() => navigate(`/booking?package=${pkg.id}`)}>
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results */}
          {filteredPackages?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No packages found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}