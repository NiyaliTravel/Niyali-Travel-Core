import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

export default function ExperiencesSection() {
  const { data: experiences, isLoading } = useQuery({
    queryKey: ['/api/experiences', { featured: 'true' }],
  });

  const handleBookExperience = (experienceId: string) => {
    console.log(`Booking experience: ${experienceId}`);
  };

  // Fallback experiences data
  const fallbackExperiences = [
    {
      id: "freediving",
      title: "Freediving Mastery",
      description: "Discover inner peace 30 meters below the surface with certified instructors",
      image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Adventure"
    },
    {
      id: "cultural",
      title: "Cultural Heritage",
      description: "Learn traditional fishing, cooking, and crafts with local families",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Cultural"
    },
    {
      id: "island-hopping",
      title: "Island Hopping",
      description: "Explore hidden lagoons and uninhabited paradises across multiple atolls",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Adventure"
    }
  ];

  const displayExperiences = (experiences as any[] || []).length > 0 ? (experiences as any[]) : fallbackExperiences;

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton h-12 w-80 mx-auto mb-4"></div>
            <div className="skeleton h-6 w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative group">
                <div className="skeleton h-80 w-full rounded-3xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experiences" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-niyali-navy mb-4">Transcendent Experiences</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in authentic Maldivian culture with AI-curated experiences tailored to your soul
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayExperiences.map((experience) => (
            <div key={experience.id} className="relative group hover-lift">
              <div className="relative h-80 rounded-3xl overflow-hidden">
                <img 
                  src={experience.image} 
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white bg-opacity-90 text-niyali-navy">
                    {experience.category}
                  </Badge>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{experience.title}</h3>
                  <p className="text-gray-200 mb-4">{experience.description}</p>
                  <Button 
                    className="bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30 transition-all"
                    onClick={() => handleBookExperience(experience.id)}
                    data-testid={`button-book-${experience.id}`}
                  >
                    Book Experience
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
