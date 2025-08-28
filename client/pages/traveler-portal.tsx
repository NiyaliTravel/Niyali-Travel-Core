import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, Heart, MessageSquare, Star, MapPin, 
  Plane, Camera, Award, CreditCard 
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function TravelerPortal() {
  const [activeTab, setActiveTab] = useState("bookings");
  
  const { data: userBookings } = useQuery({
    queryKey: ['/api/bookings/user'],
  });

  const { data: loyaltyProgram } = useQuery({
    queryKey: ['/api/loyalty/user'],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
        >
          <div className="absolute inset-0 bg-niyali-navy bg-opacity-80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            My <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600">Travel Hub</span>
          </h1>
          <p className="text-xl mb-6">
            Manage your bookings, explore wishlist, and track your travel journey
          </p>
        </div>
      </section>

      {/* Traveler Dashboard */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid lg:grid-cols-4">
              <TabsTrigger value="bookings" data-testid="tab-bookings">My Trips</TabsTrigger>
              <TabsTrigger value="wishlist" data-testid="tab-wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="loyalty" data-testid="tab-loyalty">Rewards</TabsTrigger>
              <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
            </TabsList>

            {/* My Trips Tab */}
            <TabsContent value="bookings" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-100 p-3 rounded-xl w-fit mx-auto mb-4">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-niyali-navy">3</h3>
                    <p className="text-gray-600">Upcoming Trips</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-green-100 p-3 rounded-xl w-fit mx-auto mb-4">
                      <Plane className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-niyali-navy">12</h3>
                    <p className="text-gray-600">Completed Trips</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-purple-100 p-3 rounded-xl w-fit mx-auto mb-4">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-niyali-navy">2,450</h3>
                    <p className="text-gray-600">Loyalty Points</p>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Trips */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-white">
                      <img 
                        src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
                        alt="Niyama Private Islands"
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-niyali-navy">Niyama Private Islands</h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Dhaalu Atoll • 5 nights
                        </p>
                        <p className="text-sm text-gray-500">Dec 15, 2024 - Dec 20, 2024</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 mb-2">Confirmed</Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" data-testid="button-view-trip">
                            <Camera className="w-4 h-4 mr-1" />
                            VR Preview
                          </Button>
                          <Button size="sm" className="niyali-gradient text-white" data-testid="button-manage-trip">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-white">
                      <img 
                        src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
                        alt="Coral Garden Villa"
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-niyali-navy">Coral Garden Villa</h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          North Malé Atoll • 3 nights
                        </p>
                        <p className="text-sm text-gray-500">Jan 10, 2025 - Jan 13, 2025</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-yellow-100 text-yellow-800 mb-2">Pending</Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" data-testid="button-view-coral-trip">
                            <Camera className="w-4 h-4 mr-1" />
                            VR Preview
                          </Button>
                          <Button size="sm" className="niyali-gradient text-white" data-testid="button-manage-coral-trip">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Past Trips */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-50">
                      <img 
                        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
                        alt="Azure Infinity Retreat"
                        className="w-20 h-14 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-niyali-navy">Azure Infinity Retreat</h4>
                        <p className="text-sm text-gray-600">Ari Atoll • Nov 2024</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-gray-100 text-gray-800 mb-2">Completed</Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" data-testid="button-review-azure">
                            Review
                          </Button>
                          <Button size="sm" variant="outline" data-testid="button-book-again-azure">
                            Book Again
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    My Wishlist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border rounded-xl overflow-hidden hover-lift">
                      <img 
                        src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" 
                        alt="Overwater Villa"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-niyali-navy mb-2">Overwater Villa Experience</h4>
                        <p className="text-sm text-gray-600 mb-3">Luxury overwater accommodation with private deck</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-niyali-navy">From $650/night</span>
                          <Button size="sm" className="niyali-gradient text-white" data-testid="button-book-overwater">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden hover-lift">
                      <img 
                        src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" 
                        alt="Freediving Experience"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-niyali-navy mb-2">Freediving Mastery Course</h4>
                        <p className="text-sm text-gray-600 mb-3">Professional freediving training with certification</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-niyali-navy">$180/person</span>
                          <Button size="sm" className="niyali-gradient text-white" data-testid="button-book-freediving">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden hover-lift">
                      <img 
                        src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" 
                        alt="Cultural Tour"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-niyali-navy mb-2">Cultural Heritage Tour</h4>
                        <p className="text-sm text-gray-600 mb-3">Traditional Maldivian village experience</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-niyali-navy">$95/person</span>
                          <Button size="sm" className="niyali-gradient text-white" data-testid="button-book-cultural">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Loyalty Tab */}
            <TabsContent value="loyalty">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-yellow-500" />
                      Loyalty Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-xl mb-4">
                        <h3 className="text-2xl font-bold">Navigator</h3>
                        <p className="text-yellow-100">Current Tier</p>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress to Captain</span>
                        <span>2,450 / 5,000 points</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-niyali-gradient h-3 rounded-full" style={{ width: "49%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Available Points</span>
                        <span className="text-xl font-bold text-niyali-navy">2,450</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Lifetime Earnings</span>
                        <span className="text-xl font-bold text-niyali-navy">8,920</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Redeem Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">$50 Travel Credit</h4>
                            <p className="text-sm text-gray-600">Use on any booking</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-niyali-navy">1,000 pts</p>
                            <Button size="sm" variant="outline" data-testid="button-redeem-50">Redeem</Button>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Free Ferry Transfer</h4>
                            <p className="text-sm text-gray-600">One complimentary transfer</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-niyali-navy">500 pts</p>
                            <Button size="sm" variant="outline" data-testid="button-redeem-ferry">Redeem</Button>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Experience Discount</h4>
                            <p className="text-sm text-gray-600">20% off any experience</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-niyali-navy">750 pts</p>
                            <Button size="sm" variant="outline" data-testid="button-redeem-experience">Redeem</Button>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 bg-gray-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-500">Free Night Upgrade</h4>
                            <p className="text-sm text-gray-500">Requires Captain tier</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-500">2,500 pts</p>
                            <Button size="sm" variant="outline" disabled>Locked</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <Input placeholder="John" data-testid="input-first-name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <Input placeholder="Smith" data-testid="input-last-name" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <Input placeholder="john@example.com" type="email" data-testid="input-email" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <Input placeholder="+1 (555) 123-4567" data-testid="input-phone" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <Input placeholder="United States" data-testid="input-country" />
                    </div>

                    <Button className="w-full niyali-gradient text-white" data-testid="button-save-profile">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Travel Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Travel Style</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Luxury Resorts</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Cultural Experiences</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Adventure Activities</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Eco-Friendly Options</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                      <Input placeholder="Vegetarian, Gluten-free, etc." data-testid="input-dietary" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Special Interests</label>
                      <Input placeholder="Diving, Photography, Wellness..." data-testid="input-interests" />
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-gray-900 mb-3">Notifications</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span>Booking confirmations</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span>Special offers</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Travel tips and guides</span>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
