import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Search, MapPin, Calendar, Users, Plus, Minus } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function HeroSearch() {
  const [, navigate] = useLocation();
  const [destination, setDestination] = useState("");
  const [island, setIsland] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [atollIslands, setAtollIslands] = useState<Record<string, string[]>>({});

  // Mock data for atolls and islands to host front page only
  const atollsData = ["North Male Atoll", "South Male Atoll", "Ari Atoll"];
  const islandsData = [
    { atoll: "North Male Atoll", name: "Hulhumale" },
    { atoll: "North Male Atoll", name: "Maafushi" },
    { atoll: "South Male Atoll", name: "Gulhi" },
    { atoll: "Ari Atoll", name: "Dhigurah" },
  ];

  // Group islands by atoll using mock data
  useEffect(() => {
    const grouped = islandsData.reduce((acc: Record<string, string[]>, island: any) => {
      if (!acc[island.atoll]) {
        acc[island.atoll] = [];
      }
      acc[island.atoll].push(island.name);
      return acc;
    }, {});
    setAtollIslands(grouped);
  }, []);


  const getTotalGuests = () => {
    const total = adults + children + infants;
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
    if (children > 0) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
    if (infants > 0) parts.push(`${infants} Infant${infants > 1 ? 's' : ''}`);
    return parts.join(', ') || '0 Guests';
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      destination,
      island,
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: children.toString(),
      infants: infants.toString(),
    });
    navigate(`/booking?${searchParams.toString()}`);
  };

  const GuestCounter = ({ label, value, onChange, min = 0, max = 10 }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
  }) => (
    <div className="flex items-center justify-between py-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          data-testid={`button-decrease-${label.toLowerCase()}`}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-medium" data-testid={`text-${label.toLowerCase()}-count`}>
          {value}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          data-testid={`button-increase-${label.toLowerCase()}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="glass-morphism rounded-xl p-6 w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Destination/Atoll Select */}
        <div className="lg:col-span-1">
          <Label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Atolls
          </Label>
          <Select value={destination} onValueChange={(value) => {
            setDestination(value);
            setIsland(""); // Reset island when atoll changes
          }}>
            <SelectTrigger data-testid="select-destination" className="bg-white">
              <SelectValue placeholder="Choose Atoll" />
            </SelectTrigger>
            <SelectContent>
              {atollsData.map((atoll) => (
                <SelectItem key={atoll} value={atoll}>
                  {atoll}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Island Select */}
        <div className="lg:col-span-1">
          <Label className="text-sm font-medium text-gray-700 mb-1">
            Island
          </Label>
          <Select value={island} onValueChange={setIsland} disabled={!destination}>
            <SelectTrigger data-testid="select-island" className="bg-white">
              <SelectValue placeholder="Choose Island" />
            </SelectTrigger>
            <SelectContent>
              {destination && atollIslands[destination]?.map((isl) => {
                if (!isl) return null;
                return (
                  <SelectItem key={isl} value={isl}>
                    {isl}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Check-in Date */}
        <div className="lg:col-span-1">
          <Label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Check-in
          </Label>
          <Input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="bg-white"
            data-testid="input-check-in"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Check-out Date */}
        <div className="lg:col-span-1">
          <Label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Check-out
          </Label>
          <Input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="bg-white"
            data-testid="input-check-out"
            min={checkIn || new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Guests Popover */}
        <div className="lg:col-span-1">
          <Label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Users className="w-4 h-4" />
            Guests
          </Label>
          <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start bg-white text-left font-normal"
                data-testid="button-guests"
              >
                {getTotalGuests()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Select Guests</h4>
                <GuestCounter
                  label="Adults"
                  value={adults}
                  onChange={setAdults}
                  min={1}
                />
                <GuestCounter
                  label="Children"
                  value={children}
                  onChange={setChildren}
                />
                <GuestCounter
                  label="Infants"
                  value={infants}
                  onChange={setInfants}
                />
                <div className="pt-2 text-xs text-gray-500">
                  Adults: 12+ years | Children: 2-11 years | Infants: Under 2 years
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="lg:col-span-1">
          <Label className="text-sm font-medium text-transparent mb-1">Search</Label>
          <Button
            onClick={handleSearch}
            className="w-full bg-niyali-gradient text-white hover:opacity-90 transition-opacity"
            data-testid="button-search"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}