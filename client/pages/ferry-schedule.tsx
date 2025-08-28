import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, Ship, Plane, DollarSign, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function FerrySchedule() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const { data: ferrySchedules, isLoading } = useQuery({
    queryKey: ['/api/ferry-schedules', { from: fromLocation, to: toLocation, date: selectedDate }],
  });

  const locations = [
    "Malé",
    "Hulhumalé", 
    "Vilimalé",
    "Dhaalu Atoll",
    "Ari Atoll",
    "Baa Atoll",
    "North Malé Atoll",
    "South Malé Atoll",
    "Lhaviyani Atoll"
  ];

  const vesselTypeIcons = {
    speedboat: Ship,
    seaplane: Plane,
    ferry: Ship
  };

  const vesselTypeColors = {
    speedboat: "bg-blue-500",
    seaplane: "bg-purple-500", 
    ferry: "bg-green-500"
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center parallax-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Ferry <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600">Schedules</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Real-time inter-island ferry information with dynamic pricing and instant booking
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-niyali-navy mb-6 text-center">Search Ferry Routes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <Select value={fromLocation} onValueChange={setFromLocation}>
                  <SelectTrigger data-testid="select-from-location">
                    <SelectValue placeholder="Select departure" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <Select value={toLocation} onValueChange={setToLocation}>
                  <SelectTrigger data-testid="select-to-location">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <Input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  data-testid="input-travel-date"
                />
              </div>
              
              <div className="flex items-end">
                <Button className="w-full niyali-gradient text-white" data-testid="button-search-ferries">
                  <Ship className="w-4 h-4 mr-2" />
                  Search Ferries
                </Button>
              </div>
            </div>

            {/* Quick Route Suggestions */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setFromLocation("Malé");
                  setToLocation("Dhaalu Atoll");
                }}
                data-testid="quick-route-male-dhaalu"
              >
                Malé → Dhaalu Atoll
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setFromLocation("Hulhumalé");
                  setToLocation("Ari Atoll");
                }}
                data-testid="quick-route-hulhumale-ari"
              >
                Hulhumalé → Ari Atoll
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setFromLocation("Malé");
                  setToLocation("Baa Atoll");
                }}
                data-testid="quick-route-male-baa"
              >
                Malé → Baa Atoll
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ferry Results */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-niyali-navy">Available Routes</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" data-testid="button-sort-time">
                Sort by Time
              </Button>
              <Button variant="outline" size="sm" data-testid="button-sort-price">
                Sort by Price
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="skeleton w-12 h-12 rounded-lg"></div>
                      <div>
                        <div className="skeleton h-5 w-32 mb-2"></div>
                        <div className="skeleton h-4 w-24"></div>
                      </div>
                    </div>
                    <div className="skeleton h-6 w-16"></div>
                    <div className="skeleton h-8 w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Sample ferry schedules - in real app these would come from API */}
              <Card className="hover:shadow-lg transition-shadow" data-testid="ferry-result-speedboat-express">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-500 p-3 rounded-xl">
                        <Ship className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-niyali-navy text-lg">Speedboat Express</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Malé → Dhaalu Atoll
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <Badge className="bg-blue-100 text-blue-800">Speedboat</Badge>
                      </div>
                    </div>
                    
                    <div className="text-center hidden md:block">
                      <div className="font-semibold text-niyali-navy flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        08:30
                      </div>
                      <div className="text-sm text-gray-600">45 min journey</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold text-xl text-niyali-navy flex items-center">
                        <DollarSign className="w-5 h-5" />
                        25
                      </div>
                      <Button 
                        size="sm" 
                        className="niyali-gradient text-white mt-2"
                        data-testid="button-book-speedboat-express"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow" data-testid="ferry-result-seaplane">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-500 p-3 rounded-xl">
                        <Plane className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-niyali-navy text-lg">Seaplane Transfer</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Malé → Dhaalu Atoll
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <Badge className="bg-purple-100 text-purple-800">Seaplane</Badge>
                      </div>
                    </div>
                    
                    <div className="text-center hidden md:block">
                      <div className="font-semibold text-niyali-navy flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        09:15
                      </div>
                      <div className="text-sm text-gray-600">15 min journey</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold text-xl text-niyali-navy flex items-center">
                        <DollarSign className="w-5 h-5" />
                        180
                      </div>
                      <Button 
                        size="sm" 
                        className="niyali-gradient text-white mt-2"
                        data-testid="button-book-seaplane"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow" data-testid="ferry-result-island-hopper">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-500 p-3 rounded-xl">
                        <Ship className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-niyali-navy text-lg">Island Hopper Ferry</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Malé → Dhaalu Atoll
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <Badge className="bg-green-100 text-green-800">Ferry</Badge>
                      </div>
                    </div>
                    
                    <div className="text-center hidden md:block">
                      <div className="font-semibold text-niyali-navy flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        10:00
                      </div>
                      <div className="text-sm text-gray-600">90 min journey</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold text-xl text-niyali-navy flex items-center">
                        <DollarSign className="w-5 h-5" />
                        15
                      </div>
                      <Button 
                        size="sm" 
                        className="niyali-gradient text-white mt-2"
                        data-testid="button-book-island-hopper"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="text-center mt-12">
            <Button size="lg" className="niyali-gradient text-white" data-testid="button-view-more-schedules">
              <Calendar className="w-5 h-5 mr-2" />
              View Weekly Schedule
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
