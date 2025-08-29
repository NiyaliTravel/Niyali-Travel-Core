import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, Users, TrendingUp, Calendar, MessageSquare, 
  Star, Award, Globe, Phone, Mail, MapPin, LogOut 
} from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function AgentPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if agent is authenticated
  useEffect(() => {
    const token = localStorage.getItem("agentToken");
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please login to access the agent portal",
        variant: "destructive"
      });
      navigate("/agent-login");
    }
  }, []);

  const { data: agentProfile } = useQuery({
    queryKey: ['/api/agents/profile'],
    enabled: !!localStorage.getItem("agentToken"),
    retry: false,
  });

  const { data: agentBookings } = useQuery({
    queryKey: ['/api/bookings/agent'],
    enabled: !!localStorage.getItem("agentToken"),
    retry: false,
  });

  const handleLogout = () => {
    localStorage.removeItem("agentToken");
    localStorage.removeItem("agentProfile");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    navigate("/agent-login");
  };

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
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Agent <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600">Portal</span>
              </h1>
              <p className="text-xl mb-6">
                Manage your bookings, track commissions, and grow your travel business
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              data-testid="button-agent-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Agent Dashboard */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid lg:grid-cols-5">
              <TabsTrigger value="dashboard" data-testid="tab-dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="bookings" data-testid="tab-bookings">Bookings</TabsTrigger>
              <TabsTrigger value="commissions" data-testid="tab-commissions">Commissions</TabsTrigger>
              <TabsTrigger value="clients" data-testid="tab-clients">Clients</TabsTrigger>
              <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-8">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                        <p className="text-3xl font-bold text-niyali-navy">$12,450</p>
                        <p className="text-sm text-green-600">+15% this month</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-xl">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                        <p className="text-3xl font-bold text-niyali-navy">28</p>
                        <p className="text-sm text-blue-600">+3 this week</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-xl">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Client Base</p>
                        <p className="text-3xl font-bold text-niyali-navy">156</p>
                        <p className="text-sm text-purple-600">+12 new clients</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-xl">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Agent Tier</p>
                        <p className="text-3xl font-bold text-niyali-navy">Gold</p>
                        <p className="text-sm text-yellow-600">20% commission</p>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded-xl">
                        <Award className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Niyama Private Islands</p>
                          <p className="text-sm text-gray-600">John & Sarah Smith</p>
                          <p className="text-sm text-gray-500">Check-in: Dec 15</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                          <p className="text-sm font-medium text-niyali-navy mt-1">$890/night</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Coral Garden Villa</p>
                          <p className="text-sm text-gray-600">Emma Johnson</p>
                          <p className="text-sm text-gray-500">Check-in: Dec 20</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                          <p className="text-sm font-medium text-niyali-navy mt-1">$320/night</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Azure Infinity Retreat</p>
                          <p className="text-sm text-gray-600">Michael Chen</p>
                          <p className="text-sm text-gray-500">Check-in: Dec 25</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
                          <p className="text-sm font-medium text-niyali-navy mt-1">$560/night</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Monthly Target</span>
                          <span>75% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-niyali-gradient h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Client Satisfaction</span>
                          <span>4.8/5.0</span>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Response Time</span>
                          <span>&lt; 2 hours</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Select>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Bookings</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Search bookings..." className="flex-1" data-testid="input-search-bookings" />
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Guest</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Property</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Dates</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="px-4 py-3">John Smith</td>
                            <td className="px-4 py-3">Niyama Private Islands</td>
                            <td className="px-4 py-3">Dec 15-20</td>
                            <td className="px-4 py-3">$4,450</td>
                            <td className="px-4 py-3">
                              <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" data-testid="button-view-booking">View</Button>
                                <Button size="sm" variant="outline" data-testid="button-message-guest">Message</Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Agent Profile</CardTitle>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <Input placeholder="Travel Co." data-testid="input-company-name" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <Textarea 
                        placeholder="Tell clients about your expertise..." 
                        rows={4}
                        data-testid="textarea-bio"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken</label>
                      <Input placeholder="English, French, Spanish" data-testid="input-languages" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Atolls</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred atolls" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="north-male">North Malé Atoll</SelectItem>
                          <SelectItem value="south-male">South Malé Atoll</SelectItem>
                          <SelectItem value="ari">Ari Atoll</SelectItem>
                          <SelectItem value="baa">Baa Atoll</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full niyali-gradient text-white" data-testid="button-save-profile">
                      Save Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="flex">
                        <div className="bg-gray-100 p-3 rounded-l-lg border border-r-0">
                          <Mail className="w-5 h-5 text-gray-500" />
                        </div>
                        <Input 
                          placeholder="agent@example.com" 
                          className="rounded-l-none border-l-0"
                          data-testid="input-email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <div className="flex">
                        <div className="bg-gray-100 p-3 rounded-l-lg border border-r-0">
                          <Phone className="w-5 h-5 text-gray-500" />
                        </div>
                        <Input 
                          placeholder="+1 (555) 123-4567" 
                          className="rounded-l-none border-l-0"
                          data-testid="input-phone"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                      <div className="flex">
                        <div className="bg-gray-100 p-3 rounded-l-lg border border-r-0">
                          <MessageSquare className="w-5 h-5 text-gray-500" />
                        </div>
                        <Input 
                          placeholder="+960 123-4567" 
                          className="rounded-l-none border-l-0"
                          data-testid="input-whatsapp"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <div className="flex">
                        <div className="bg-gray-100 p-3 rounded-l-lg border border-r-0">
                          <Globe className="w-5 h-5 text-gray-500" />
                        </div>
                        <Select>
                          <SelectTrigger className="rounded-l-none border-l-0">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="de">Germany</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-gray-900 mb-3">Agent Tier Status</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge className="bg-yellow-100 text-yellow-800 text-lg px-3 py-1">
                            <Award className="w-4 h-4 mr-1" />
                            Gold Agent
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">20% commission rate</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Next tier: Platinum</p>
                          <p className="text-sm font-medium">$15,000 more needed</p>
                        </div>
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
