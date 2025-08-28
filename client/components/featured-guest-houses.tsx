import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";


export default function FeaturedGuestHouses() {


  const { data: guestHouses, isLoading } = useQuery({
    queryKey: ['/api/guest-houses', { featured: 'true' }],
  });



  const handleBookNow = (guestHouseId: string) => {
    // Handle booking functionality
    console.log(`Booking guest house: ${guestHouseId}`);
  };

  // Fallback data for display when API doesn't return data
  const fallbackGuestHouses: any[] = [
    {
      id: "niyama",
      name: "Niyama Private Islands",
      location: "Dhaalu Atoll • Twin Islands Experience",
      description: "World's first underwater nightclub, floating restaurant, and treetop dining in pristine twin islands",
      price: "890",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      badge: { text: "Featured", color: "bg-coral" },
      vrTourUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
    },
    {
      id: "coral-garden",
      name: "Coral Garden Villa",
      location: "North Malé Atoll • Sustainable Living",
      description: "Solar-powered beachfront villa with private coral garden and traditional Maldivian cultural experiences",
      price: "320",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      badge: { text: "Eco-Friendly", color: "bg-green-500" },
      vrTourUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
    },
    {
      id: "azure-infinity",
      name: "Azure Infinity Retreat",
      location: "Ari Atoll • Modern Luxury",
      description: "Contemporary design meets Maldivian charm with infinity pool, spa services, and AI-powered concierge",
      price: "560",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      badge: { text: "New", color: "bg-purple-500" },
      vrTourUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
    }
  ];

  const displayGuestHouses = (Array.isArray(guestHouses) && guestHouses.length > 0) ? guestHouses : fallbackGuestHouses;

  if (isLoading) {
    return (
      <section className="py-20 bg-niyali-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton h-12 w-80 mx-auto mb-4"></div>
            <div className="skeleton h-6 w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
      </section>
    );
  }

  return (
    <section id="resorts" className="py-20 bg-niyali-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-niyali-navy mb-4">Premium Guest Houses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience authentic Maldivian hospitality with our curated selection of luxury guest houses, each offering unique cultural immersion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayGuestHouses.map((guestHouse: any) => (
            <Card key={guestHouse.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover-lift">
              <div className="relative">
                <img 
                  src={guestHouse.images?.[0] || guestHouse.image || 'https://images.unsplash.com/photo-1582719508461-905c673771fd'} 
                  alt={guestHouse.name}
                  className="w-full h-64 object-cover"
                />
                {guestHouse.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge className={`${guestHouse.badge.color} text-white`}>
                      {guestHouse.badge.text}
                    </Badge>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex items-center text-white">
                  <Star className="w-5 h-5 text-yellow-400 mr-1 fill-current" />
                  <span className="text-sm font-medium">{guestHouse.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-niyali-navy mb-2">{guestHouse.name}</h3>
                <p className="text-gray-600 text-sm mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {typeof guestHouse.location === 'object' 
                    ? guestHouse.location?.address || `${guestHouse.island}, ${guestHouse.atoll}`
                    : guestHouse.location || `${guestHouse.island}, ${guestHouse.atoll}`}
                </p>
                <p className="text-gray-700 mb-4">{guestHouse.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-niyali-navy">${guestHouse.pricePerNight || guestHouse.price || '250'}</span>
                    <span className="text-gray-500">/night</span>
                  </div>
                  <div className="flex space-x-2">

                    <Button 
                      size="sm"
                      variant="outline"
                      className="border-2 border-niyali-navy text-niyali-navy hover:bg-niyali-navy hover:text-white transition-all"
                      onClick={() => handleBookNow(guestHouse.id)}
                      data-testid={`button-book-${guestHouse.id}`}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-niyali-gradient text-white hover:opacity-90 transition-opacity"
            data-testid="button-view-all-guest-houses"
          >
            View All Guest Houses
          </Button>
        </div>
      </div>


    </section>
  );
}
