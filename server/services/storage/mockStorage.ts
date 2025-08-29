import {
  type User, type InsertUser, type Agent, type InsertAgent, type GuestHouse, type InsertGuestHouse,
  type Booking, type InsertBooking, type Experience, type InsertExperience, type FerrySchedule,
  type InsertFerrySchedule, type Review, type InsertReview, type ChatMessage, type InsertChatMessage,
  type LoyaltyProgram, type DomesticAirline, type InsertDomesticAirline, type ContentSection,
  type InsertContentSection, type NavigationItem, type InsertNavigationItem,
  type Package, type InsertPackage, type RoomAvailability, type InsertRoomAvailability,
  type PackageAvailability, type InsertPackageAvailability
} from "@shared/schema";
import { IStorage } from "./storage";
import { nanoid } from "nanoid";

interface Island {
  id: number;
  name: string;
  atoll: string;
  isActive: boolean;
  hasGuestHouses: boolean;
  population: number;
  description: string;
}

export class MockStorage implements IStorage {
  // Mock data
  private mockGuestHouses: GuestHouse[] = [
    {
      id: 1,
      name: "Paradise Island Guesthouse",
      description: "A beautiful guesthouse with stunning ocean views",
      atoll: "North Male",
      island: "Thulusdhoo",
      location: JSON.stringify({ lat: 4.0, lng: 73.5, address: "Thulusdhoo Island" }),
      images: ["/images/guesthouse1.jpg"],
      amenities: ["WiFi", "Air Conditioning", "Restaurant", "Diving Center"],
      roomTypes: [JSON.stringify({ type: "Standard", price: 150, capacity: 2 })],
      price: 150.00,
      maxGuests: 20,
      rating: 4.5,
      reviewCount: 48,
      isActive: true,
      featured: true,
      contactInfo: JSON.stringify({ phone: "+960 123-4567", email: "info@paradise.mv" }),
      policies: JSON.stringify({ checkIn: "14:00", checkOut: "12:00" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Coral Beach Lodge",
      description: "Eco-friendly lodge with pristine coral reef access",
      atoll: "South Ari",
      island: "Dhigurah",
      location: JSON.stringify({ lat: 3.5, lng: 72.8, address: "Dhigurah Island" }),
      images: ["/images/guesthouse2.jpg"],
      amenities: ["WiFi", "Restaurant", "Snorkeling", "Bicycle Rental"],
      roomTypes: [JSON.stringify({ type: "Ocean View", price: 200, capacity: 2 })],
      price: 200.00,
      maxGuests: 16,
      rating: 4.8,
      reviewCount: 32,
      isActive: true,
      featured: true,
      contactInfo: JSON.stringify({ phone: "+960 234-5678", email: "info@coralbeach.mv" }),
      policies: JSON.stringify({ checkIn: "15:00", checkOut: "11:00" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  private mockExperiences: Experience[] = [
    {
      id: 1,
      name: "Whale Shark Diving",
      description: "Swimming with the gentle giants of the ocean",
      category: "diving",
      location: "South Ari Atoll",
      duration: "Half Day",
      price: 120.00,
      maxParticipants: 8,
      images: ["/images/whale-shark.jpg"],
      difficulty: "moderate",
      includedItems: ["Equipment", "Guide", "Lunch"],
      requirements: ["Swimming ability", "Medical clearance"],
      isActive: true,
      featured: true,
      rating: 4.9,
      reviewCount: 156,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Cultural Village Tour",
      description: "Experience authentic Maldivian culture",
      category: "cultural",
      location: "Various Islands",
      duration: "Full Day",
      price: 85.00,
      maxParticipants: 12,
      images: ["/images/village-tour.jpg"],
      difficulty: "easy",
      includedItems: ["Transport", "Guide", "Traditional Lunch"],
      requirements: ["Comfortable walking shoes"],
      isActive: true,
      featured: false,
      rating: 4.6,
      reviewCount: 89,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  private mockFerrySchedules: FerrySchedule[] = [
    {
      id: 1,
      operatorName: "Maldivian Ferries",
      fromLocation: "Male",
      toLocation: "Thulusdhoo",
      departureTime: "09:00",
      arrivalTime: "10:30",
      duration: "1h 30m",
      price: 45.00,
      vesselType: "speedboat",
      capacity: 50,
      availableSeats: 25,
      operatingDays: ["Monday", "Wednesday", "Friday"],
      isActive: true,
      bookingUrl: "https://ferries.mv/book",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      operatorName: "Island Express",
      fromLocation: "Male",
      toLocation: "Dhigurah",
      departureTime: "14:00",
      arrivalTime: "16:45",
      duration: "2h 45m",
      price: 75.00,
      vesselType: "speedboat",
      capacity: 40,
      availableSeats: 18,
      operatingDays: ["Tuesday", "Thursday", "Saturday"],
      isActive: true,
      bookingUrl: "https://islandexpress.mv/book",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  private mockDomesticAirlines: DomesticAirline[] = [
    {
      id: 1,
      airlineName: "Maldivian Airways",
      airlineCode: "Q2",
      flightNumber: "Q2 101", // Added missing flightNumber
      fromLocation: "Male (VML)",
      toLocation: "Gan (GAN)",
      departureTime: "08:30",
      arrivalTime: "10:15",
      duration: "1h 45m",
      aircraftType: "domestic_plane",
      price: 180.00,
      frequency: "daily",
      operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      capacity: 50,
      availableSeats: 12,
      baggageAllowance: "20kg checked, 7kg carry-on",
      isActive: true,
      bookingUrl: "https://maldivian.aero/book",
      contactInfo: JSON.stringify({ phone: "+960 330-0500", email: "reservations@maldivian.aero" }),
      notes: "Meals included on flights over 1 hour",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  private mockPackages: Package[] = [
    {
      id: 1,
      name: "Romantic Lagoon Escape",
      description: "Couples & Honeymooners",
      inclusions: ["3 nights accommodation", "Daily breakfast", "House Reef Snorkeling", "Sunset Dolphin Cruise", "Welcome drink", "Round-trip scheduled speedboat transfer", "All taxes + Green Tax"],
      exclusions: [],
      duration: "4 Days / 3 Nights",
      price: 431.25,
      maxGuests: 2,
      guestHouseIds: [1],
      experienceIds: [],
      images: [],
      validFrom: new Date(),
      validTo: new Date(),
      featured: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Explorer’s Island Quest",
      description: "Adventure Seekers & Nature Lovers",
      inclusions: ["4 nights accommodation", "Daily breakfast", "Shipwreck + Sandbank", "Coral Garden Snorkeling", "Guided Island Tour", "Round-trip scheduled speedboat transfer"],
      exclusions: [],
      duration: "5 Days / 4 Nights",
      price: 575.00,
      maxGuests: 2,
      guestHouseIds: [1],
      experienceIds: [],
      images: [],
      validFrom: new Date(),
      validTo: new Date(),
      featured: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Maldives Family Discovery",
      description: "Families with children",
      inclusions: ["4 nights accommodation", "Daily breakfast", "Shark & Turtle Viewing", "Sting Ray Encounter + Drone Photo", "Night Fishing + BBQ", "Round-trip scheduled speedboat transfer"],
      exclusions: [],
      duration: "5 Days / 4 Nights",
      price: 1380.00,
      maxGuests: 4,
      guestHouseIds: [1],
      experienceIds: [],
      images: [],
      validFrom: new Date(),
      validTo: new Date(),
      featured: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: "Dive & Discover Retreat",
      description: "Certified Divers",
      inclusions: ["5 nights accommodation", "Daily breakfast", "Whale Shark Adventure", "Shipwreck + Sandbank", "House Reef Snorkeling", "Round-trip scheduled speedboat transfer"],
      exclusions: [],
      duration: "6 Days / 5 Nights",
      price: 862.50,
      maxGuests: 3,
      guestHouseIds: [1],
      experienceIds: [],
      images: [],
      validFrom: new Date(),
      validTo: new Date(),
      featured: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      name: "Freediver’s Ocean Flow",
      description: "Freedivers & Breathwork Enthusiasts",
      inclusions: ["4 nights accommodation", "Daily breakfast", "Coral Garden Snorkeling", "Turtle Point Snorkeling", "Round-trip scheduled speedboat transfer"],
      exclusions: [],
      duration: "5 Days / 4 Nights",
      price: 575.00,
      maxGuests: 2,
      guestHouseIds: [1],
      experienceIds: [],
      images: [],
      validFrom: new Date(),
      validTo: new Date(),
      featured: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  private mockIslands: Island[] = [
    {
      id: 1,
      name: "Thulusdhoo",
      atoll: "North Male",
      isActive: true,
      hasGuestHouses: true,
      population: 1200,
      description: "Famous surfing destination",
    },
    {
      id: 2,
      name: "Dhigurah",
      atoll: "South Ari",
      isActive: true,
      hasGuestHouses: true,
      population: 800,
      description: "Known for whale shark sightings",
    },
    {
      id: 3,
      name: "Maafushi",
      atoll: "South Male",
      isActive: true,
      hasGuestHouses: true,
      population: 2500,
      description: "Popular budget travel destination",
    },
    {
      id: 4,
      name: "Gulhi",
      atoll: "South Male",
      isActive: true,
      hasGuestHouses: false,
      population: 900,
      description: "Local island experience",
    }
  ];

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return undefined; // Mock implementation
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser = { ...user, id: this.mockExperiences.length + 1, createdAt: new Date(), updatedAt: new Date() };
    return newUser as User;
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined> {
    return undefined;
  }

  // Agent operations
  async getAgent(id: number): Promise<Agent | undefined> {
    return undefined;
  }

  async getAgentByUserId(userId: number): Promise<Agent | undefined> {
    return undefined;
  }

  async createAgent(agent: InsertAgent): Promise<Agent> {
    const newAgent = { ...agent, id: this.mockExperiences.length + 1, createdAt: new Date(), updatedAt: new Date() };
    return newAgent as Agent;
  }

  async updateAgent(id: number, agent: Partial<InsertAgent>): Promise<Agent | undefined> {
    return undefined;
  }

  async getAgentsByTier(tier: string): Promise<Agent[]> {
    return [];
  }

  async getAllAgents(): Promise<Agent[]> {
    return [];
  }

  // Guest House operations
  async getGuestHouse(id: number): Promise<GuestHouse | undefined> {
    return this.mockGuestHouses.find(gh => gh.id === Number(id));
  }

  async getAllGuestHouses(): Promise<GuestHouse[]> {
    return this.mockGuestHouses;
  }

  async getFeaturedGuestHouses(): Promise<GuestHouse[]> {
    return this.mockGuestHouses.filter(gh => gh.featured);
  }

  async getGuestHousesByAtoll(atoll: string): Promise<GuestHouse[]> {
    return this.mockGuestHouses.filter(gh => gh.atoll === atoll);
  }

  async searchGuestHouses(query: string): Promise<GuestHouse[]> {
    return this.mockGuestHouses.filter(gh => 
      gh.name.toLowerCase().includes(query.toLowerCase()) ||
      gh.atoll.toLowerCase().includes(query.toLowerCase()) ||
      gh.island.toLowerCase().includes(query.toLowerCase())
    );
  }

  async createGuestHouse(guestHouse: InsertGuestHouse): Promise<GuestHouse> {
    const newGuestHouse = { ...guestHouse, id: this.mockGuestHouses.length + 1, createdAt: new Date(), updatedAt: new Date() };
    this.mockGuestHouses.push(newGuestHouse as GuestHouse);
    return newGuestHouse as GuestHouse;
  }

  async updateGuestHouse(id: number, guestHouse: Partial<InsertGuestHouse>): Promise<GuestHouse | undefined> {
    const index = this.mockGuestHouses.findIndex(gh => gh.id === Number(id));
    if (index > -1) {
      this.mockGuestHouses[index] = { ...this.mockGuestHouses[index], ...guestHouse };
      return this.mockGuestHouses[index];
    }
    return undefined;
  }

  async deleteGuestHouse(id: number): Promise<boolean> {
    const initialLength = this.mockGuestHouses.length;
    this.mockGuestHouses = this.mockGuestHouses.filter(gh => gh.id !== Number(id));
    return this.mockGuestHouses.length < initialLength;
  }

  // Islands operations
  async getAllIslands(filters?: { search?: string; atoll?: string; hasGuestHouses?: boolean }): Promise<Island[]> {
    let islands = this.mockIslands;
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      islands = islands.filter(island =>
        island.name.toLowerCase().includes(search) ||
        island.atoll.toLowerCase().includes(search)
      );
    }
    
    if (filters?.atoll) {
      islands = islands.filter(island => island.atoll === filters.atoll);
    }
    
    if (filters?.hasGuestHouses !== undefined) {
      islands = islands.filter(island => island.hasGuestHouses === filters.hasGuestHouses);
    }
    
    return islands.filter(island => island.isActive);
  }

  async getIsland(id: number): Promise<Island | undefined> {
    return this.mockIslands.find(island => island.id === Number(id) && island.isActive);
  }

  // Experience operations
  async getAllExperiences(): Promise<Experience[]> {
    return this.mockExperiences;
  }

  async getFeaturedExperiences(): Promise<Experience[]> {
    return this.mockExperiences.filter(exp => exp.featured);
  }

  async getExperiencesByCategory(category: string): Promise<Experience[]> {
    return this.mockExperiences.filter(exp => exp.category === category);
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    return this.mockExperiences.find(exp => exp.id === Number(id));
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    const newExperience = { ...experience, id: this.mockExperiences.length + 1, isActive: true, featured: false, rating: 0.0, reviewCount: 0, createdAt: new Date(), updatedAt: new Date() };
    this.mockExperiences.push(newExperience as Experience);
    return newExperience as Experience;
  }

  async updateExperience(id: number, updateExperience: Partial<InsertExperience>): Promise<Experience | undefined> {
    const index = this.mockExperiences.findIndex(exp => exp.id === Number(id));
    if (index > -1) {
      this.mockExperiences[index] = { ...this.mockExperiences[index], ...updateExperience };
      return this.mockExperiences[index];
    }
    return undefined;
  }

  async deleteExperience(id: number): Promise<boolean> {
    const initialLength = this.mockExperiences.length;
    this.mockExperiences = this.mockExperiences.filter(exp => exp.id !== Number(id));
    return this.mockExperiences.length < initialLength;
  }

  // Ferry Schedule operations
  async getAllFerrySchedules(): Promise<FerrySchedule[]> {
    return this.mockFerrySchedules;
  }

  async searchFerrySchedules(from: string, to: string, date?: string): Promise<FerrySchedule[]> {
    return this.mockFerrySchedules.filter(schedule => 
      schedule.fromLocation.toLowerCase().includes(from.toLowerCase()) &&
      schedule.toLocation.toLowerCase().includes(to.toLowerCase())
    );
  }

  async getFerrySchedule(id: number): Promise<FerrySchedule | undefined> {
    return this.mockFerrySchedules.find(schedule => schedule.id === Number(id));
  }

  async createFerrySchedule(schedule: InsertFerrySchedule): Promise<FerrySchedule> {
    const newSchedule = { ...schedule, id: this.mockFerrySchedules.length + 1, isActive: true, createdAt: new Date(), updatedAt: new Date() };
    this.mockFerrySchedules.push(newSchedule as FerrySchedule);
    return newSchedule as FerrySchedule;
  }

  async updateFerrySchedule(id: number, updateSchedule: Partial<InsertFerrySchedule>): Promise<FerrySchedule | undefined> {
    const index = this.mockFerrySchedules.findIndex(sch => sch.id === Number(id));
    if (index > -1) {
      this.mockFerrySchedules[index] = { ...this.mockFerrySchedules[index], ...updateSchedule };
      return this.mockFerrySchedules[index];
    }
    return undefined;
  }

  async deleteFerrySchedule(id: number): Promise<boolean> {
    const initialLength = this.mockFerrySchedules.length;
    this.mockFerrySchedules = this.mockFerrySchedules.filter(sch => sch.id !== Number(id));
    return this.mockFerrySchedules.length < initialLength;
  }

  // Domestic Airlines operations
  async getAllDomesticAirlines(): Promise<DomesticAirline[]> {
    return this.mockDomesticAirlines;
  }

  async searchDomesticAirlines(from: string, to: string, date?: string): Promise<DomesticAirline[]> {
    return this.mockDomesticAirlines.filter(airline => 
      airline.fromLocation.toLowerCase().includes(from.toLowerCase()) &&
      airline.toLocation.toLowerCase().includes(to.toLowerCase())
    );
  }

  async getDomesticAirline(id: number): Promise<DomesticAirline | undefined> {
    return this.mockDomesticAirlines.find(airline => airline.id === Number(id));
  }

  async createDomesticAirline(airline: InsertDomesticAirline): Promise<DomesticAirline> {
    const newAirline = { ...airline, id: this.mockDomesticAirlines.length + 1, isActive: true, createdAt: new Date(), updatedAt: new Date() };
    this.mockDomesticAirlines.push(newAirline as DomesticAirline);
    return newAirline as DomesticAirline;
  }

  async updateDomesticAirline(id: number, updateAirline: Partial<InsertDomesticAirline>): Promise<DomesticAirline | undefined> {
    const index = this.mockDomesticAirlines.findIndex(air => air.id === Number(id));
    if (index > -1) {
      this.mockDomesticAirlines[index] = { ...this.mockDomesticAirlines[index], ...updateAirline };
      return this.mockDomesticAirlines[index];
    }
    return undefined;
  }

  async deleteDomesticAirline(id: number): Promise<boolean> {
    const initialLength = this.mockDomesticAirlines.length;
    this.mockDomesticAirlines = this.mockDomesticAirlines.filter(air => air.id !== Number(id));
    return this.mockDomesticAirlines.length < initialLength;
  }

  async getDomesticAirlinesByType(aircraftType: string): Promise<DomesticAirline[]> {
    return this.mockDomesticAirlines.filter(airline => airline.aircraftType === aircraftType);
  }

  // Package operations
  async getAllPackages(): Promise<Package[]> {
    return this.mockPackages;
  }

  async getPackages(): Promise<Package[]> {
    return this.mockPackages;
  }

  async getPackage(id: number): Promise<Package | null> {
    return this.mockPackages.find(pkg => pkg.id === Number(id)) || null;
  }

  async getPackageById(id: number): Promise<Package | null> {
    return this.mockPackages.find(pkg => pkg.id === Number(id)) || null;
  }

  async createPackage(data: InsertPackage): Promise<Package> {
    const newPackage = { ...data, id: this.mockPackages.length + 1, isActive: true, featured: false, createdAt: new Date(), updatedAt: new Date() };
    this.mockPackages.push(newPackage as Package);
    return newPackage as Package;
  }

  async updatePackage(id: number, data: Partial<InsertPackage>): Promise<Package | null> {
    const index = this.mockPackages.findIndex(pkg => pkg.id === Number(id));
    if (index > -1) {
      this.mockPackages[index] = { ...this.mockPackages[index], ...data };
      return this.mockPackages[index];
    }
    return null;
  }

  async deletePackage(id: number): Promise<boolean> {
    const initialLength = this.mockPackages.length;
    this.mockPackages = this.mockPackages.filter(pkg => pkg.id !== Number(id));
    return this.mockPackages.length < initialLength;
  }

  // Stub implementations for other methods
  async getBooking(id: number): Promise<Booking | undefined> { return undefined; }
  async getBookingsByUser(userId: number): Promise<Booking[]> { return []; }
  async getBookingsByAgent(agentId: number): Promise<Booking[]> { return []; }
  async getBookingsByGuestHouse(guestHouseId: number): Promise<Booking[]> { return []; }
  async createBooking(booking: InsertBooking): Promise<Booking> { throw new Error("Not implemented"); }
  async updateBooking(id: number, booking: Partial<InsertBooking>): Promise<Booking | undefined> { return undefined; }
  async getBookingAvailability(guestHouseId: number, checkIn: Date, checkOut: Date): Promise<boolean> { return true; }
  async getReviewsByGuestHouse(guestHouseId: number): Promise<Review[]> { return []; }
  async getReviewsByUser(userId: number): Promise<Review[]> { return []; }
  async createReview(review: InsertReview): Promise<Review> { throw new Error("Not implemented"); }
  async getChatMessages(sessionId: string): Promise<ChatMessage[]> { return []; }
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> { throw new Error("Not implemented"); }
  async getLoyaltyProgram(userId: number): Promise<LoyaltyProgram | undefined> { return undefined; }
  async updateLoyaltyPoints(userId: number, points: number): Promise<LoyaltyProgram | undefined> { return undefined; }
  async getContentSection(sectionKey: string): Promise<ContentSection | undefined> { return undefined; }
  async getAllContentSections(): Promise<ContentSection[]> { return []; }
  async createContentSection(content: InsertContentSection): Promise<ContentSection> { throw new Error("Not implemented"); }
  async updateContentSection(id: number, content: Partial<InsertContentSection>): Promise<ContentSection | undefined> { return undefined; }
  async getAllNavigationItems(): Promise<NavigationItem[]> { return []; }
  async createNavigationItem(item: InsertNavigationItem): Promise<NavigationItem> { throw new Error("Not implemented"); }
  async updateNavigationItem(id: number, item: Partial<InsertNavigationItem>): Promise<NavigationItem | undefined> { return undefined; }
  async deleteNavigationItem(id: number): Promise<boolean> { return false; }
  async getRoomAvailability(guestHouseId?: string, date?: Date): Promise<RoomAvailability[]> { return []; }
  async createRoomAvailability(data: InsertRoomAvailability): Promise<RoomAvailability> { throw new Error("Not implemented"); }
  async updateRoomAvailability(id: number, data: Partial<InsertRoomAvailability>): Promise<RoomAvailability | null> { return null; }
  async checkRoomAvailability(guestHouseId: number, checkIn: Date, checkOut: Date): Promise<boolean> { return true; }
  async getPackageAvailability(packageId?: number, date?: Date): Promise<PackageAvailability[]> { return []; }
  async createPackageAvailability(data: InsertPackageAvailability): Promise<PackageAvailability> { throw new Error("Not implemented"); }
  async updatePackageAvailability(id: number, data: Partial<InsertPackageAvailability>): Promise<PackageAvailability | null> { return null; }
  async updateAvailabilityAfterBooking(booking: Booking): Promise<void> { }
  async getUserBookings(userId: number): Promise<Booking[]> { return []; }
  async updateBookingStatus(bookingId: number, status: string): Promise<Booking | null> { return null; }
}

export const mockStorage = new MockStorage();