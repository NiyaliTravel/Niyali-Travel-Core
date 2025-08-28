import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Camera } from "lucide-react";

const atolls = [
  {
    id: 1,
    name: "North Malé Atoll",
    description: "Home to the capital city and main international airport, offering luxury resorts and easy access",
    guestHouses: 24,
    islands: 50,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    highlights: ["Airport proximity", "Luxury resorts", "Cultural sites"]
  },
  {
    id: 2,
    name: "South Malé Atoll",
    description: "Pristine waters and world-class diving spots with vibrant marine life",
    guestHouses: 18,
    islands: 30,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    highlights: ["World-class diving", "Marine life", "Water sports"]
  },
  {
    id: 3,
    name: "Ari Atoll",
    description: "Famous for whale shark encounters and luxury overwater villas",
    guestHouses: 32,
    islands: 105,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    highlights: ["Whale sharks", "Overwater villas", "Snorkeling"]
  },
  {
    id: 4,
    name: "Baa Atoll",
    description: "UNESCO Biosphere Reserve with unique marine biodiversity",
    guestHouses: 15,
    islands: 75,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    highlights: ["UNESCO Reserve", "Manta rays", "Conservation"]
  },
  {
    id: 5,
    name: "Dhaalu Atoll",
    description: "Exclusive resorts and traditional Maldivian culture experiences",
    guestHouses: 12,
    islands: 56,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    highlights: ["Exclusive resorts", "Cultural heritage", "Local experiences"]
  },
  {
    id: 6,
    name: "Lhaviyani Atoll",
    description: "Pristine coral reefs and excellent diving conditions",
    guestHouses: 8,
    islands: 54,
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    highlights: ["Coral reefs", "Diving", "Marine sanctuary"]
  }
];

export default function Destinations() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center parallax-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Explore <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600">26 Atolls</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Discover the diverse beauty of the Maldives across pristine atolls, each offering unique experiences and authentic local culture
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-niyali-navy mb-4">Featured Atolls</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each atoll offers its own unique charm, from world-class diving to cultural heritage sites
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {atolls.map((atoll) => (
              <Card key={atoll.id} className="overflow-hidden hover-lift group cursor-pointer" data-testid={`atoll-card-${atoll.id}`}>
                <div className="relative">
                  <img 
                    src={atoll.image} 
                    alt={atoll.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white bg-opacity-90 text-niyali-navy">
                      {atoll.guestHouses} Guest Houses
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-niyali-navy mb-3">{atoll.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{atoll.description}</p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{atoll.islands} Islands</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{atoll.guestHouses} Properties</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {atoll.highlights.map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 niyali-gradient text-white" data-testid={`button-explore-${atoll.id}`}>
                      Explore Atoll
                    </Button>
                    <Button variant="outline" size="sm" data-testid={`button-vr-${atoll.id}`}>
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="niyali-gradient text-white" data-testid="button-view-all-atolls">
              View All 26 Atolls
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-niyali-navy mb-4">Interactive Atoll Map</h2>
            <p className="text-xl text-gray-600">Click on any atoll to explore guest houses and experiences</p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-niyali-navy mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-niyali-navy mb-2">Interactive Map</h3>
                <p className="text-gray-600 mb-4">Full interactive map with VR previews coming soon</p>
                <Button className="niyali-gradient text-white" data-testid="button-preview-map">
                  Preview Map Features
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
