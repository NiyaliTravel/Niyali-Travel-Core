// import { db } from "@/models/db";
// import { guestHouses, packages, packageAvailability } from "@shared/schema";

const seedNewGuestHouses = async () => {
  console.log("Starting to seed new guest houses...");
  
  try {
    // Add the new guest houses
    const newGuestHouses = [
      {
        name: "TME Retreat",
        description: "A luxurious beachfront retreat offering world-class amenities and personalized service. Experience the perfect blend of modern comfort and traditional Maldivian hospitality.",
        atoll: "North Malé Atoll",
        island: "Thulusdhoo",
        location: { lat: 4.3775, lng: 73.5873, address: "Thulusdhoo Island" },
        images: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd",
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
        ],
        amenities: ["Wi-Fi", "Air Conditioning", "Beach Access", "Spa", "Restaurant", "Water Sports", "Diving Center"],
        roomTypes: [
          { type: "Deluxe Room", price: 150, capacity: 2 },
          { type: "Beach Villa", price: 250, capacity: 3 },
          { type: "Water Villa", price: 350, capacity: 4 }
        ],
        pricePerNight: "150.00",
        maxGuests: 40,
        rating: "4.70",
        reviewCount: 201,
        featured: true,
        contactInfo: { phone: "+960 7784567", email: "info@tmeretreat.mv" },
        policies: { checkIn: "14:00", checkOut: "12:00", cancellation: "Free cancellation up to 72 hours" }
      },
      {
        name: "Ari Grand",
        description: "Situated in the heart of Ari Atoll, offering unparalleled access to whale shark and manta ray diving spots. Premium accommodation with ocean views.",
        atoll: "Ari Atoll",
        island: "Rasdhoo",
        location: { lat: 4.2620, lng: 72.9969, address: "Rasdhoo Island" },
        images: [
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
        ],
        amenities: ["Wi-Fi", "Air Conditioning", "Diving Center", "Restaurant", "Beach Access", "Spa", "Snorkeling Equipment"],
        roomTypes: [
          { type: "Standard Room", price: 120, capacity: 2 },
          { type: "Deluxe Ocean View", price: 180, capacity: 3 },
          { type: "Family Suite", price: 280, capacity: 5 }
        ],
        pricePerNight: "120.00",
        maxGuests: 35,
        rating: "4.60",
        reviewCount: 178,
        featured: true,
        contactInfo: { phone: "+960 7789012", email: "reservations@arigrand.mv" },
        policies: { checkIn: "13:00", checkOut: "11:00", cancellation: "Free cancellation up to 48 hours" }
      },
      {
        name: "The Arrival",
        description: "Your gateway to paradise. Modern facilities with traditional charm, perfect for both business and leisure travelers seeking authentic experiences.",
        atoll: "South Malé Atoll",
        island: "Gulhi",
        location: { lat: 3.9139, lng: 73.4369, address: "Gulhi Island" },
        images: [
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
          "https://images.unsplash.com/photo-1540541338287-41700207dee6"
        ],
        amenities: ["Wi-Fi", "Air Conditioning", "Conference Room", "Restaurant", "Beach Access", "Bicycle Rental"],
        roomTypes: [
          { type: "Budget Room", price: 80, capacity: 2 },
          { type: "Standard Room", price: 110, capacity: 3 },
          { type: "Executive Suite", price: 200, capacity: 4 }
        ],
        pricePerNight: "80.00",
        maxGuests: 30,
        rating: "4.40",
        reviewCount: 145,
        featured: false,
        contactInfo: { phone: "+960 7783456", email: "stay@thearrival.mv" },
        policies: { checkIn: "14:00", checkOut: "12:00", cancellation: "Free cancellation up to 24 hours" }
      },
      {
        name: "Noomuraka Inn",
        description: "A cozy family-run inn offering warm hospitality and home-cooked meals. Experience local island life while enjoying modern comforts.",
        atoll: "Baa Atoll",
        island: "Dharavandhoo",
        location: { lat: 5.1667, lng: 73.1333, address: "Dharavandhoo Island" },
        images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
        ],
        amenities: ["Wi-Fi", "Air Conditioning", "Local Cuisine Restaurant", "Beach Access", "Cultural Tours", "Fishing Trips"],
        roomTypes: [
          { type: "Standard Room", price: 70, capacity: 2 },
          { type: "Family Room", price: 120, capacity: 4 },
          { type: "Garden View Suite", price: 150, capacity: 3 }
        ],
        pricePerNight: "70.00",
        maxGuests: 25,
        rating: "4.50",
        reviewCount: 132,
        featured: false,
        contactInfo: { phone: "+960 7787890", email: "info@noomuraka.mv" },
        policies: { checkIn: "13:00", checkOut: "11:00", cancellation: "Free cancellation up to 48 hours" }
      },
      {
        name: "Noomo Hotels",
        description: "A modern hotel chain offering consistent quality across multiple islands. Perfect for island hopping with guaranteed comfort at each location.",
        atoll: "Lhaviyani Atoll",
        island: "Naifaru",
        location: { lat: 5.4444, lng: 73.3656, address: "Naifaru Island" },
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
        ],
        amenities: ["Wi-Fi", "Air Conditioning", "Restaurant", "Gym", "Business Center", "Laundry Service", "Airport Transfer"],
        roomTypes: [
          { type: "Standard Room", price: 90, capacity: 2 },
          { type: "Superior Room", price: 130, capacity: 3 },
          { type: "Executive Suite", price: 220, capacity: 4 }
        ],
        pricePerNight: "90.00",
        maxGuests: 50,
        rating: "4.30",
        reviewCount: 267,
        featured: false,
        contactInfo: { phone: "+960 7785678", email: "reservations@noomohotels.mv" },
        policies: { checkIn: "15:00", checkOut: "12:00", cancellation: "Free cancellation up to 24 hours" }
      },
      {
        name: "Madi Grand Guest House",
        description: "Premium beachfront accommodation in South Ari Atoll. Specializing in diving, snorkeling, and marine life experiences with customized packages for all travelers.",
        atoll: "South Ari Atoll",
        island: "Maamigili",
        location: { lat: 3.4708, lng: 72.8367, address: "Maamigili Island" },
        images: [
          "https://images.unsplash.com/photo-1540541338287-41700207dee6",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd"
        ],
        amenities: ["Wi-Fi", "Air Conditioning", "Beach Access", "Diving Center", "Restaurant", "Spa", "Water Sports", "Whale Shark Tours"],
        roomTypes: [
          { type: "Deluxe Double Room", price: 143.75, capacity: 2 },
          { type: "Deluxe Triple Room", price: 178.25, capacity: 3 },
          { type: "Premium Family Room", price: 287.50, capacity: 4 },
          { type: "Premium Double Room", price: 178.25, capacity: 2 }
        ],
        pricePerNight: "143.75",
        maxGuests: 45,
        rating: "4.80",
        reviewCount: 289,
        featured: true,
        contactInfo: { phone: "+960 7789999", email: "bookings@madigrand.mv" },
        policies: { 
          checkIn: "14:00", 
          checkOut: "12:00", 
          cancellation: "50% deposit required. Free cancellation up to 30 days. 50% charge 15-30 days prior. 100% within 15 days." 
        }
      }
    ];

    // Insert guest houses
    const insertedGuestHouses = await db.insert(guestHouses).values(newGuestHouses).returning();
    console.log(`Inserted ${insertedGuestHouses.length} new guest houses`);

    // Find Madi Grand Guest House
    const madiGrand = insertedGuestHouses.find(gh => gh.name === "Madi Grand Guest House");
    
    if (madiGrand) {
      // Add Madi Grand packages
      const madiPackages = [
        {
          guestHouseId: madiGrand.id,
          name: "Romantic Lagoon Escape",
          description: "Perfect for couples & honeymooners. Includes house reef snorkeling and sunset dolphin cruise.",
          duration: 3, // 4 Days / 3 Nights
          price: "431.25",
          inclusions: [
            "3 nights accommodation in Deluxe Double Room",
            "Daily breakfast",
            "House Reef Snorkeling ($51.75 value)",
            "Sunset Dolphin Cruise ($51.75 value)",
            "Welcome drink",
            "Round-trip scheduled speedboat transfer",
            "All taxes + Green Tax"
          ],
          itinerary: [
            "Day 1: Arrival & welcome drink",
            "Day 2: House Reef Snorkeling",
            "Day 3: Sunset Dolphin Cruise",
            "Day 4: Breakfast & departure"
          ],
          maxGuests: 2,
          isActive: true
        },
        {
          guestHouseId: madiGrand.id,
          name: "Explorer's Island Quest",
          description: "For adventure seekers & nature lovers. Discover shipwrecks, sandbanks, and coral gardens.",
          duration: 4, // 5 Days / 4 Nights
          price: "575.00",
          inclusions: [
            "4 nights accommodation in Deluxe Double Room",
            "Daily breakfast",
            "Shipwreck + Sandbank excursion ($80.50 value)",
            "Coral Garden Snorkeling ($51.75 value)",
            "Guided Island Tour ($63.25 value)",
            "Round-trip scheduled speedboat transfer"
          ],
          itinerary: [
            "Day 1: Arrival & welcome drink",
            "Day 2: Shipwreck + Sandbank",
            "Day 3: Coral Garden Snorkeling",
            "Day 4: Guided Island Tour",
            "Day 5: Breakfast & departure"
          ],
          maxGuests: 2,
          isActive: true
        },
        {
          guestHouseId: madiGrand.id,
          name: "Maldives Family Discovery",
          description: "Family-friendly package with shark viewing, stingray encounters, and night fishing.",
          duration: 4, // 5 Days / 4 Nights
          price: "1380.00",
          inclusions: [
            "4 nights accommodation in Premium Family Room",
            "Daily breakfast for the family",
            "Shark & Turtle Viewing ($46.00 value)",
            "Sting Ray Encounter + Drone Photo ($40.25 value)",
            "Night Fishing + BBQ ($57.50 value)",
            "Round-trip scheduled speedboat transfer"
          ],
          itinerary: [
            "Day 1: Arrival & welcome drink",
            "Day 2: Shark & Turtle Viewing",
            "Day 3: Sting Ray + Drone Photo",
            "Day 4: Night Fishing + BBQ",
            "Day 5: Breakfast & departure"
          ],
          maxGuests: 4,
          isActive: true
        },
        {
          guestHouseId: madiGrand.id,
          name: "Dive & Discover Retreat",
          description: "For certified divers. Includes whale shark adventure and shipwreck exploration.",
          duration: 5, // 6 Days / 5 Nights
          price: "862.50",
          inclusions: [
            "5 nights accommodation in Deluxe Triple Room",
            "Daily breakfast",
            "Whale Shark Adventure ($115.00 value)",
            "Shipwreck + Sandbank ($80.50 value)",
            "House Reef Snorkeling ($51.75 value)",
            "Round-trip scheduled speedboat transfer"
          ],
          itinerary: [
            "Day 1: Arrival & welcome drink",
            "Day 2: Whale Shark Adventure",
            "Day 3: Shipwreck + Sandbank",
            "Day 4: House Reef Snorkeling",
            "Day 5: Leisure / Optional Dive",
            "Day 6: Breakfast & departure"
          ],
          maxGuests: 3,
          isActive: true
        },
        {
          guestHouseId: madiGrand.id,
          name: "Freediver's Ocean Flow",
          description: "For freedivers & breathwork enthusiasts. Focus on coral gardens and turtle points.",
          duration: 4, // 5 Days / 4 Nights
          price: "575.00",
          inclusions: [
            "4 nights accommodation in Deluxe Double Room",
            "Daily breakfast",
            "Coral Garden Snorkeling ($51.75 value)",
            "Turtle Point Snorkeling ($67.85 value)",
            "Round-trip scheduled speedboat transfer"
          ],
          itinerary: [
            "Day 1: Arrival & welcome drink",
            "Day 2: Coral Garden Snorkeling",
            "Day 3: Turtle Point Snorkeling",
            "Day 4: Leisure / Optional Breathwork",
            "Day 5: Breakfast & departure"
          ],
          maxGuests: 2,
          isActive: true
        },
        {
          guestHouseId: madiGrand.id,
          name: "Ocean Harmony Experience",
          description: "For wellness seekers. Includes snorkeling, sunset cruise, and drone photography.",
          duration: 6, // 7 Days / 6 Nights
          price: "1207.50",
          inclusions: [
            "6 nights accommodation in Premium Double Room",
            "Daily breakfast",
            "Coral Garden Snorkeling ($51.75 value)",
            "Sunset Cruise ($51.75 value)",
            "Drone Photography Session ($40.25 value)",
            "Round-trip scheduled speedboat transfer"
          ],
          itinerary: [
            "Day 1: Arrival & welcome drink",
            "Day 2: Coral Garden Snorkeling",
            "Day 3: Leisure / Optional Yoga",
            "Day 4: Sunset Cruise",
            "Day 5: Drone Photography",
            "Day 6: Kayaking / Optional Massage",
            "Day 7: Breakfast & departure"
          ],
          maxGuests: 2,
          isActive: true
        }
      ];

      const insertedPackages = await db.insert(packages).values(madiPackages).returning();
      console.log(`Inserted ${insertedPackages.length} packages for Madi Grand`);
    }

    console.log("Successfully seeded new guest houses and packages!");
  } catch (error) {
    console.error("Error seeding new guest houses:", error);
    throw error;
  }
};

// Run the seed
seedNewGuestHouses()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });