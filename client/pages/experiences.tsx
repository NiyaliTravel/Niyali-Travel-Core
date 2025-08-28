import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Experiences() {
  const { data: experiences, isLoading } = useQuery({
    queryKey: ['/api/experiences'],
  });

  const categories = [
    { id: 'freediving', name: 'Freediving', count: 12, icon: '🤿' },
    { id: 'cultural', name: 'Cultural', count: 18, icon: '🏛️' },
    { id: 'adventure', name: 'Adventure', count: 15, icon: '⛵' },
    { id: 'culinary', name: 'Culinary', count: 8, icon: '🍽️' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="shimmer w-32 h-8 rounded-lg"></div>
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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transcendent <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600">Experiences</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Immerse yourself in authentic Maldivian culture with AI-curated experiences tailored to your soul
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="flex items-center gap-2 hover:niyali-gradient hover:text-white transition-all"
                data-testid={`filter-${category.id}`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-1">{category.count}</Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Experience Cards */}
            <Card className="overflow-hidden hover-lift group cursor-pointer" data-testid="experience-card-freediving">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Freediving experience"
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
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">🤿 Freediving</Badge>
                  <Badge variant="outline" className="text-xs">Advanced</Badge>
                </div>
                
                <h3 className="text-xl font-bold text-niyali-navy mb-2">Deep Ocean Freediving Mastery</h3>
                <p className="text-gray-600 mb-4">Discover inner peace 30 meters below the surface with certified PADI instructors and safety divers</p>
                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>6 hours</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Max 4 people</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-niyali-navy">$180</span>
                    <span className="text-gray-500">/person</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" data-testid="button-vr-freediving">VR Preview</Button>
                    <Button size="sm" className="niyali-gradient text-white" data-testid="button-book-freediving">Book Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover-lift group cursor-pointer" data-testid="experience-card-cultural">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Cultural heritage experience"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white">Authentic</Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center text-white">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">🏛️ Cultural</Badge>
                  <Badge variant="outline" className="text-xs">Family Friendly</Badge>
                </div>
                
                <h3 className="text-xl font-bold text-niyali-navy mb-2">Traditional Maldivian Heritage</h3>
                <p className="text-gray-600 mb-4">Learn traditional fishing, cooking, and crafts with local families in authentic village settings</p>
                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>4 hours</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Max 8 people</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-niyali-navy">$95</span>
                    <span className="text-gray-500">/person</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" data-testid="button-vr-cultural">VR Preview</Button>
                    <Button size="sm" className="niyali-gradient text-white" data-testid="button-book-cultural">Book Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover-lift group cursor-pointer" data-testid="experience-card-adventure">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Island hopping adventure"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-500 text-white">Adventure</Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center text-white">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">4.7</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">⛵ Adventure</Badge>
                  <Badge variant="outline" className="text-xs">Full Day</Badge>
                </div>
                
                <h3 className="text-xl font-bold text-niyali-navy mb-2">Multi-Atoll Island Hopping</h3>
                <p className="text-gray-600 mb-4">Explore hidden lagoons and uninhabited paradises across multiple atolls with local guide</p>
                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>8 hours</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Max 12 people</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-niyali-navy">$220</span>
                    <span className="text-gray-500">/person</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" data-testid="button-vr-adventure">VR Preview</Button>
                    <Button size="sm" className="niyali-gradient text-white" data-testid="button-book-adventure">Book Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="niyali-gradient text-white" data-testid="button-view-all-experiences">
              <Calendar className="w-5 h-5 mr-2" />
              View All Experiences
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
