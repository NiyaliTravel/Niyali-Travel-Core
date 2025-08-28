import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DomesticAirline } from "@shared/schema";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plane, Clock, MapPin, Users, Package, ExternalLink, Filter, Search } from "lucide-react";

export default function DomesticAirlines() {
  const [searchFilters, setSearchFilters] = useState({
    from: "",
    to: "",
    date: "",
    aircraftType: ""
  });

  const { data: airlines = [], isLoading, error } = useQuery<DomesticAirline[]>({
    queryKey: ['/api/domestic-airlines', searchFilters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchFilters.from) params.append('from', searchFilters.from);
      if (searchFilters.to) params.append('to', searchFilters.to);
      if (searchFilters.date) params.append('date', searchFilters.date);
      if (searchFilters.aircraftType) params.append('aircraftType', searchFilters.aircraftType);
      
      const response = await fetch(`/api/domestic-airlines?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch domestic airlines');
      }
      return response.json();
    }
  });

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setSearchFilters({ from: "", to: "", date: "", aircraftType: "" });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAircraftTypeColor = (type: string) => {
    switch (type) {
      case 'seaplane':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'domestic_plane':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error Loading Airlines</h2>
            <p className="text-gray-600 dark:text-gray-400">Failed to load domestic airlines. Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      {/* Header Section */}
      <div className="pt-16 bg-gradient-to-br from-niyali-navy to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Plane className="w-16 h-16 mx-auto mb-6 text-white/80" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Domestic Airlines
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover convenient domestic flights and seaplane services connecting islands across the Maldives
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search Flights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <Input
                  placeholder="Departure location"
                  value={searchFilters.from}
                  onChange={(e) => handleFilterChange('from', e.target.value)}
                  data-testid="input-departure-location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <Input
                  placeholder="To"
                  value={searchFilters.to}
                  onChange={(e) => handleFilterChange('to', e.target.value)}
                  data-testid="input-destination"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input
                  type="date"
                  value={searchFilters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  data-testid="input-travel-date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Aircraft Type</label>
                <Select value={searchFilters.aircraftType} onValueChange={(value) => handleFilterChange('aircraftType', value)}>
                  <SelectTrigger data-testid="select-aircraft-type">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="seaplane">Seaplane</SelectItem>
                    <SelectItem value="domestic_plane">Domestic Plane</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="flex-1"
                  data-testid="button-clear-filters"
                >
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Airlines List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : airlines.length === 0 ? (
          <div className="text-center py-12">
            <Plane className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No Flights Found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {Object.values(searchFilters).some(value => value) 
                ? "Try adjusting your search filters to find available flights."
                : "No domestic airlines are currently available."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {airlines.map((airline) => (
              <Card key={airline.id} className="hover:shadow-lg transition-shadow duration-300" data-testid={`card-airline-${airline.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-niyali-navy dark:text-blue-300">
                        {airline.airlineName}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {airline.airlineCode}
                      </p>
                    </div>
                    <Badge className={getAircraftTypeColor(airline.aircraftType || '')}>
                      {airline.aircraftType?.replace('_', ' ') || 'Standard'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Route Information */}
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">From</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{airline.fromLocation}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatTime(airline.departureTime)}</p>
                    </div>
                    <div className="flex-1 px-4">
                      <div className="flex items-center justify-center">
                        <div className="h-0.5 bg-gray-300 dark:bg-gray-600 flex-1"></div>
                        <Plane className="w-4 h-4 mx-2 text-gray-400 transform rotate-90" />
                        <div className="h-0.5 bg-gray-300 dark:bg-gray-600 flex-1"></div>
                      </div>
                      {airline.duration && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">{airline.duration}</p>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">To</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{airline.toLocation}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatTime(airline.arrivalTime)}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Flight Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {airline.frequency || 'Regular'}
                      </span>
                    </div>
                    {airline.capacity && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {airline.capacity} seats
                        </span>
                      </div>
                    )}
                    {airline.baggageAllowance && (
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {airline.baggageAllowance}
                        </span>
                      </div>
                    )}
                    {airline.availableSeats && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {airline.availableSeats} available
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Operating Days */}
                  {airline.operatingDays && airline.operatingDays.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Operating Days:</p>
                      <div className="flex flex-wrap gap-1">
                        {airline.operatingDays.map((day) => (
                          <Badge key={day} variant="outline" className="text-xs">
                            {day.slice(0, 3)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price and Booking */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-2xl font-bold text-niyali-navy dark:text-blue-300">
                        ${Number(airline.price).toFixed(0)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">per person</p>
                    </div>
                    {airline.bookingUrl ? (
                      <Button 
                        asChild 
                        className="bg-niyali-gradient hover:opacity-90"
                        data-testid={`button-book-${airline.id}`}
                      >
                        <a href={airline.bookingUrl} target="_blank" rel="noopener noreferrer">
                          Book Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        data-testid={`button-contact-${airline.id}`}
                      >
                        Contact
                      </Button>
                    )}
                  </div>

                  {/* Notes */}
                  {airline.notes && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">{airline.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}