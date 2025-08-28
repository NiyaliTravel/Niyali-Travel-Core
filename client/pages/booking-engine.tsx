import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/utils/queryClient";
import { 
  Calendar as CalendarIcon, 
  Users, 
  MapPin, 
  Star, 
  Clock, 
  Package,
  CreditCard,
  Check,
  Plus
} from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function BookingEngine() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [searchType, setSearchType] = useState<"rooms" | "packages">("rooms");
  const [selectedGuestHouse, setSelectedGuestHouse] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch guest houses
  const { data: guestHouses, isLoading: isLoadingGuestHouses } = useQuery({
    queryKey: ['/api/guest-houses'],
  });

  // Fetch room availability
  const { data: roomAvailability, isLoading: isLoadingRooms } = useQuery({
    queryKey: ['/api/room-availability', selectedGuestHouse, selectedDate],
    enabled: !!selectedGuestHouse && !!selectedDate,
  });

  // Fetch packages
  const { data: packages, isLoading: isLoadingPackages } = useQuery({
    queryKey: ['/api/packages'],
  });

  // Fetch package availability
  const { data: packageAvailability, isLoading: isLoadingPackageAvailability } = useQuery({
    queryKey: ['/api/package-availability', selectedPackage, selectedDate],
    enabled: !!selectedPackage && !!selectedDate,
  });

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest('POST', '/api/bookings', data);
      return res.json();
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      setCurrentStep(4); // Go to payment step
      toast({ title: "Booking Created", description: "Proceeding to payment..." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create booking", variant: "destructive" });
    }
  });

  // Payment mutation
  const createPaymentMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest('POST', '/api/create-payment-intent', data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Payment Successful", description: "Booking confirmed!" });
      setCurrentStep(5); // Confirmation step
    },
    onError: () => {
      toast({ title: "Payment Failed", description: "Please try again", variant: "destructive" });
    }
  });

  const handleSearch = () => {
    if (!selectedDate) {
      toast({ title: "Select Date", description: "Please select a check-in date", variant: "destructive" });
      return;
    }
    setCurrentStep(2);
  };

  const handleSelectRoom = (guestHouseId: string, roomType: string) => {
    setSelectedGuestHouse(guestHouseId);
    setSelectedRoom(roomType);
    setCurrentStep(3);
  };

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    setCurrentStep(3);
  };

  const handleCreateBooking = () => {
    const booking = {
      type: searchType,
      guestHouseId: selectedGuestHouse,
      packageId: selectedPackage,
      roomType: selectedRoom,
      checkIn: selectedDate,
      checkOut: new Date(selectedDate!.getTime() + 24 * 60 * 60 * 1000), // Next day
      guests,
      ...bookingData
    };
    createBookingMutation.mutate(booking);
  };

  const handlePayment = () => {
    const paymentData = {
      amount: searchType === "rooms" ? 250 : 500, // Sample amounts
      currency: "USD",
      bookingId: "temp-booking-id"
    };
    createPaymentMutation.mutate(paymentData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-niyali-navy mb-4">Book Your Stay</h1>
            <p className="text-xl text-gray-600">Secure booking with instant confirmation</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[
                { step: 1, title: "Search", icon: CalendarIcon },
                { step: 2, title: "Select", icon: MapPin },
                { step: 3, title: "Details", icon: Users },
                { step: 4, title: "Payment", icon: CreditCard },
                { step: 5, title: "Confirm", icon: Check }
              ].map(({ step, title, icon: Icon }) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step ? 'bg-niyali-gradient text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step ? 'text-niyali-navy' : 'text-gray-500'
                  }`}>
                    {title}
                  </span>
                  {step < 5 && <div className="w-8 h-0.5 bg-gray-200 ml-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Search */}
          {currentStep === 1 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Search Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={searchType} onValueChange={(value) => setSearchType(value as "rooms" | "packages")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="rooms">Rooms</TabsTrigger>
                    <TabsTrigger value="packages">Packages</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>Guests</Label>
                    <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleSearch} className="w-full bg-niyali-gradient text-white" data-testid="button-search-availability">
                  Search Availability
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Select Room/Package */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {searchType === "rooms" ? (
                <div>
                  <h2 className="text-2xl font-bold text-niyali-navy mb-6">Available Rooms</h2>
                  {isLoadingGuestHouses ? (
                    <div className="text-center py-8">Loading guest houses...</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array.isArray(guestHouses) && guestHouses.map((guestHouse: any) => (
                        <Card key={guestHouse.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold text-lg">{guestHouse.name}</h3>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                <span className="text-sm">{guestHouse.rating || "4.5"}</span>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-4">{guestHouse.location || guestHouse.atoll}</p>
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between">
                                <span>Standard Room</span>
                                <span className="font-bold">${guestHouse.pricePerNight || "250"}/night</span>
                              </div>
                              <Badge variant="outline" className="text-green-600">Available</Badge>
                            </div>
                            <Button 
                              onClick={() => handleSelectRoom(guestHouse.id, "standard")}
                              className="w-full"
                              data-testid={`button-select-room-${guestHouse.id}`}
                            >
                              Select Room
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-niyali-navy mb-6">Available Packages</h2>
                  {isLoadingPackages ? (
                    <div className="text-center py-8">Loading packages...</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Sample packages since backend might not have data yet */}
                      {[
                        {
                          id: "maldivian-culture",
                          name: "Maldivian Culture Experience",
                          description: "3-day cultural immersion with local experiences",
                          duration: 3,
                          price: 850,
                          inclusions: ["Accommodation", "All meals", "Cultural tours", "Airport transfers"]
                        },
                        {
                          id: "diving-adventure",
                          name: "Diving Adventure Package",
                          description: "5-day diving experience with certified instructors",
                          duration: 5,
                          price: 1200,
                          inclusions: ["Accommodation", "Diving equipment", "Boat transfers", "Meals"]
                        }
                      ].map((pkg) => (
                        <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold text-lg">{pkg.name}</h3>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 text-gray-500 mr-1" />
                                <span className="text-sm">{pkg.duration} days</span>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-4">{pkg.description}</p>
                            <div className="space-y-2 mb-4">
                              <h4 className="font-medium">Includes:</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {pkg.inclusions.map((item, index) => (
                                  <li key={index} className="flex items-center">
                                    <Check className="w-3 h-3 text-green-500 mr-2" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-2xl font-bold text-niyali-navy">${pkg.price}</span>
                              <Badge variant="outline" className="text-green-600">Available</Badge>
                            </div>
                            <Button 
                              onClick={() => handleSelectPackage(pkg.id)}
                              className="w-full"
                              data-testid={`button-select-package-${pkg.id}`}
                            >
                              Select Package
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Booking Details */}
          {currentStep === 3 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={bookingData.firstName}
                      onChange={(e) => setBookingData(prev => ({ ...prev, firstName: e.target.value }))}
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={bookingData.lastName}
                      onChange={(e) => setBookingData(prev => ({ ...prev, lastName: e.target.value }))}
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                    data-testid="input-phone"
                  />
                </div>
                <div>
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                    placeholder="Any special requirements or requests"
                    data-testid="textarea-special-requests"
                  />
                </div>
                <Button onClick={handleCreateBooking} className="w-full bg-niyali-gradient text-white" data-testid="button-create-booking">
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{selectedDate ? format(selectedDate, "PPP") : "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests:</span>
                      <span>{guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{searchType === "rooms" ? "Room Booking" : "Package"}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${searchType === "rooms" ? "250" : "500"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Secure payment powered by Stripe</p>
                  <Button onClick={handlePayment} className="bg-niyali-gradient text-white" data-testid="button-process-payment">
                    Process Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-niyali-navy mb-4">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your booking. You will receive a confirmation email shortly.
                </p>
                <Button onClick={() => setCurrentStep(1)} variant="outline" data-testid="button-new-booking">
                  Make Another Booking
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}