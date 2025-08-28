import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Ship, Plane, Clock, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function FerryScheduleWidget() {
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
    "Baa Atoll"
  ];

  const handleBookFerry = (ferryId: string) => {
    console.log(`Booking ferry: ${ferryId}`);
  };

  // Fallback ferry data
  const fallbackSchedules = [
    {
      id: "speedboat-express",
      operatorName: "Speedboat Express",
      fromLocation: "Malé",
      toLocation: "Dhaalu Atoll",
      departureTime: "08:30",
      duration: "45 min",
      price: "25",
      vesselType: "speedboat"
    },
    {
      id: "seaplane-transfer",
      operatorName: "Seaplane Transfer",
      fromLocation: "Malé", 
      toLocation: "Dhaalu Atoll",
      departureTime: "09:15",
      duration: "15 min",
      price: "180",
      vesselType: "seaplane"
    }
  ];

  const displaySchedules = (ferrySchedules as any[] || []).length > 0 ? (ferrySchedules as any[]) : fallbackSchedules;

  return (
    <section id="ferry" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-niyali-navy mb-4">Live Ferry Schedule</h2>
          <p className="text-xl text-gray-600">Real-time inter-island ferry information with dynamic pricing</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <Select value={fromLocation} onValueChange={setFromLocation}>
                <SelectTrigger data-testid="select-from">
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
                <SelectTrigger data-testid="select-to">
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
                className="focus:ring-2 focus:ring-niyali-gold focus:border-transparent"
                data-testid="input-ferry-date"
              />
            </div>
            <div className="flex items-end">
              <Button 
                className="w-full bg-niyali-gradient text-white hover:opacity-90 transition-opacity"
                data-testid="button-search-ferries"
              >
                Search Ferries
              </Button>
            </div>
          </div>
          
          {/* Ferry Results */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="skeleton h-12 w-48"></div>
                    <div className="skeleton h-8 w-20"></div>
                    <div className="skeleton h-8 w-24"></div>
                  </div>
                ))}
              </div>
            ) : (
              displaySchedules.map((ferry) => (
                <div 
                  key={ferry.id} 
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors"
                  data-testid={`ferry-result-${ferry.id}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${ferry.vesselType === 'seaplane' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                      {ferry.vesselType === 'seaplane' ? (
                        <Plane className="w-6 h-6 text-white" />
                      ) : (
                        <Ship className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-niyali-navy">{ferry.operatorName}</div>
                      <div className="text-sm text-gray-600">{ferry.fromLocation} → {ferry.toLocation}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-niyali-navy flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {ferry.departureTime}
                    </div>
                    <div className="text-sm text-gray-600">{ferry.duration}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-niyali-navy flex items-center">
                      <DollarSign className="w-5 h-5" />
                      {ferry.price}
                    </div>
                    <Button 
                      size="sm"
                      className="bg-niyali-gradient text-white mt-1 hover:opacity-90 transition-opacity"
                      onClick={() => handleBookFerry(ferry.id)}
                      data-testid={`button-book-${ferry.id}`}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
