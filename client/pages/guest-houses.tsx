import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Users, Wifi, Car, Utensils, Camera } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function GuestHouses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAtoll, setSelectedAtoll] = useState("all");
  const [priceRange, setPriceRange] = useState("any");

  const { data: guestHouses, isLoading } = useQuery({
    queryKey: ['/api/guest-houses', { 
      search: searchQuery, 
      atoll: selectedAtoll === 'all' ? '' : selectedAtoll,
      featured: 'false'
    }],
  });

  const atolls = [
    "North Malé Atoll",
    "South Malé Atoll", 
    "Ari Atoll",
    "Baa Atoll",
    "Dhaalu Atoll",
    "Lhaviyani Atoll"
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20">
          {/* Loading skeleton */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden">
                  <div className="skeleton h-64 w-full"></div>
                  <div className="p-6">
                    <div className="skeleton h-6 w-3/4 mb-2"></div>
                    <div className="skeleton h-4 w-1/2 mb-4"></div>
                    <div className="skeleton h-16 w-full mb-4"></div>
                    <div className="flex justify-between">
                      <div className="skeleton h-8 w-20"></div>
                      <div className="skeleton h-8 w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center parallax-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Premium <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600">Guest Houses</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Experience authentic Maldivian hospitality with our curated selection of luxury guest houses
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <Input 
                  placeholder="Search guest houses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-guest-houses"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Atoll</label>
                <Select value={selectedAtoll} onValueChange={setSelectedAtoll}>
                  <SelectTrigger data-testid="select-atoll">
                    <SelectValue placeholder="All Atolls" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Atolls</SelectItem>
                    {atolls.map((atoll) => (
                      <SelectItem key={atoll} value={atoll}>{atoll}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger data-testid="select-price-range">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="0-200">$0 - $200</SelectItem>
                    <SelectItem value="200-500">$200 - $500</SelectItem>
                    <SelectItem value="500-1000">$500 - $1000</SelectItem>
                    <SelectItem value="1000+">$1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full niyali-gradient text-white" data-testid="button-search">
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Houses Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-niyali-navy">Available Guest Houses</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" data-testid="button-sort-price">
                Sort by Price
              </Button>
              <Button variant="outline" size="sm" data-testid="button-sort-rating">
                Sort by Rating
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Guest House Cards - Using real structure but with example data since no real data provided */}
            <Card className="overflow-hidden hover-lift group cursor-pointer" data-testid="guest-house-card-niyama">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                  alt="Niyama Private Islands"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-coral text-white">Featured</Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center text-white">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">4.9</span>
                </div>

              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-niyali-navy">Niyama Private Islands</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Dhaalu Atoll</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">World's first underwater nightclub, floating restaurant, and treetop dining experience</p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Up to 8 guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-4 h-4" />
                    <Car className="w-4 h-4" />
                    <Utensils className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-niyali-navy">$890</span>
                    <span className="text-gray-500">/night</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/booking?guestHouse=niyama" passHref>
                      <a><Button size="sm" variant="outline" data-testid="button-details-niyama">Details</Button></a>
                    </Link>
                    <Link href="/booking?guestHouse=niyama" passHref>
                      <a><Button size="sm" className="niyali-gradient text-white" data-testid="button-book-niyama">Book Now</Button></a>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover-lift group cursor-pointer" data-testid="guest-house-card-coral">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                  alt="Coral Garden Villa"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white">Eco-Friendly</Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center text-white">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">4.7</span>
                </div>

              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-niyali-navy">Coral Garden Villa</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>North Malé</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">Solar-powered beachfront villa with private coral garden and traditional experiences</p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Up to 6 guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-4 h-4" />
                    <Car className="w-4 h-4" />
                    <Utensils className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-niyali-navy">$320</span>
                    <span className="text-gray-500">/night</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/booking?guestHouse=coral" passHref>
                      <a><Button size="sm" variant="outline" data-testid="button-details-coral">Details</Button></a>
                    </Link>
                    <Link href="/booking?guestHouse=coral" passHref>
                      <a><Button size="sm" className="niyali-gradient text-white" data-testid="button-book-coral">Book Now</Button></a>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover-lift group cursor-pointer" data-testid="guest-house-card-azure">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                  alt="Azure Infinity Retreat"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-500 text-white">New</Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center text-white">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Button size="sm" variant="secondary" className="bg-white bg-opacity-90" data-testid="button-vr-azure">
                    <Camera className="w-4 h-4 mr-1" />
                    VR Tour
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-niyali-navy">Azure Infinity Retreat</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Ari Atoll</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">Contemporary design with infinity pool, spa services, and AI-powered concierge</p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Up to 10 guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-4 h-4" />
                    <Car className="w-4 h-4" />
                    <Utensils className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-niyali-navy">$560</span>
                    <span className="text-gray-500">/night</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/booking?guestHouse=azure" passHref>
                      <a><Button size="sm" variant="outline" data-testid="button-details-azure">Details</Button></a>
                    </Link>
                    <Link href="/booking?guestHouse=azure" passHref>
                      <a><Button size="sm" className="niyali-gradient text-white" data-testid="button-book-azure">Book Now</Button></a>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="niyali-gradient text-white" data-testid="button-load-more">
              Load More Guest Houses
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
