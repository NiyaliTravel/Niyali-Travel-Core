import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DomesticAirline } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function DomesticAirlinesWidget() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: airlines = [], isLoading } = useQuery<DomesticAirline[]>({
    queryKey: ['/api/domestic-airlines'],
    queryFn: async () => {
      const response = await fetch('/api/domestic-airlines');
      if (!response.ok) {
        throw new Error('Failed to fetch domestic airlines');
      }
      return response.json();
    }
  });

  const filteredAirlines = airlines.filter(airline => 
    airline.fromLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    airline.toLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    airline.airlineName.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);

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

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Plane className="w-12 h-12 mx-auto text-niyali-navy dark:text-blue-400 mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Domestic Flights
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Connect between islands with our domestic airlines and seaplane services
          </p>
          
          {/* Quick Search */}
          <div className="max-w-md mx-auto mb-8">
            <Input
              type="text"
              placeholder="Search flights by location or airline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-center"
              data-testid="input-flight-search"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
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
        ) : filteredAirlines.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? "No flights found for your search." : "No domestic flights available."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredAirlines.map((airline) => (
              <Card 
                key={airline.id} 
                className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800"
                data-testid={`card-flight-${airline.id}`}
              >
                <CardHeader className="pb-3">
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
                  {/* Route with Animation */}
                  <div className="flex items-center justify-between group">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">FROM</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {airline.fromLocation.split(' ')[0]}
                      </p>
                      <p className="text-xs text-niyali-navy dark:text-blue-300 font-medium">
                        {formatTime(airline.departureTime)}
                      </p>
                    </div>
                    <div className="flex-1 px-3">
                      <div className="flex items-center justify-center">
                        <div className="h-0.5 bg-gradient-to-r from-niyali-navy to-blue-400 flex-1"></div>
                        <ArrowRight className="w-4 h-4 mx-2 text-niyali-navy dark:text-blue-400 group-hover:transform group-hover:translate-x-1 transition-transform" />
                        <div className="h-0.5 bg-gradient-to-r from-blue-400 to-niyali-navy flex-1"></div>
                      </div>
                      {airline.duration && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                          {airline.duration}
                        </p>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">TO</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {airline.toLocation.split(' ')[0]}
                      </p>
                      <p className="text-xs text-niyali-navy dark:text-blue-300 font-medium">
                        {formatTime(airline.arrivalTime)}
                      </p>
                    </div>
                  </div>

                  {/* Price and availability */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-niyali-navy dark:text-blue-300">
                        ${Number(airline.price).toFixed(0)}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">per person</p>
                    </div>
                    {airline.availableSeats && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                          {airline.availableSeats} seats
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">available</p>
                      </div>
                    )}
                  </div>

                  {/* Quick book button */}
                  {airline.bookingUrl ? (
                    <Button 
                      asChild 
                      className="w-full bg-niyali-gradient hover:opacity-90 transition-opacity"
                      size="sm"
                      data-testid={`button-quick-book-${airline.id}`}
                    >
                      <a href={airline.bookingUrl} target="_blank" rel="noopener noreferrer">
                        Quick Book
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="sm"
                      data-testid={`button-view-details-${airline.id}`}
                    >
                      View Details
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            asChild 
            size="lg" 
            className="bg-niyali-gradient hover:opacity-90 transition-opacity"
            data-testid="button-view-all-flights"
          >
            <Link href="/domestic-airlines">
              View All Domestic Flights
              <Plane className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}