import { db } from "@/models/db";
import { guestHouses } from "@shared/schema";

const seedGuestHouses = async () => {
  const guestHousesData = [
    {
      name: "Coral Beach Inn",
      description: "A charming beachfront guest house offering authentic Maldivian hospitality with modern comforts. Enjoy pristine beaches, crystal-clear waters, and personalized service.",
      atoll: "North Malé Atoll",
      island: "Hulhumalé",
      location: { lat: 4.2105, lng: 73.5409, address: "Beach Road, Hulhumalé" },
      images: [
        "https://images.unsplash.com/photo-1540541338287-41700207dee6",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
      ],
      amenities: ["Wi-Fi", "Air Conditioning", "Beach Access", "Restaurant", "Spa", "Water Sports"],
      roomTypes: [
        { type: "Standard Room", price: 85, capacity: 2 },
        { type: "Deluxe Room", price: 120, capacity: 3 },
        { type: "Beach Villa", price: 180, capacity: 4 }
      ],
      pricePerNight: "85.00",
      maxGuests: 30,
      rating: "4.50",
      reviewCount: 124,
      featured: true,
      contactInfo: { phone: "+960 7781234", email: "info@coralbeachinn.mv" },
      policies: { checkIn: "14:00", checkOut: "12:00", cancellation: "Free cancellation up to 48 hours" }
    },
    {
      name: "Sunset Paradise Guest House",
      description: "Experience breathtaking sunsets and warm hospitality at our family-run guest house. Located on a quiet island with excellent snorkeling and diving spots nearby.",
      atoll: "South Malé Atoll",
      island: "Maafushi",
      location: { lat: 3.9444, lng: 73.4889, address: "Sunset Avenue, Maafushi" },
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
      ],
      amenities: ["Wi-Fi", "Air Conditioning", "Diving Center", "Restaurant", "Bicycle Rental", "BBQ Area"],
      roomTypes: [
        { type: "Budget Room", price: 65, capacity: 2 },
        { type: "Standard Room", price: 95, capacity: 3 },
        { type: "Family Suite", price: 150, capacity: 5 }
      ],
      pricePerNight: "65.00",
      maxGuests: 25,
      rating: "4.30",
      reviewCount: 89,
      featured: false,
      contactInfo: { phone: "+960 7789876", email: "book@sunsetparadise.mv" },
      policies: { checkIn: "13:00", checkOut: "11:00", cancellation: "Free cancellation up to 24 hours" }
    },
    {
      name: "Ocean Breeze Retreat",
      description: "A tranquil escape surrounded by turquoise waters and white sandy beaches. Perfect for couples and families seeking relaxation and adventure.",
      atoll: "Ari Atoll",
      island: "Dhigurah",
      location: { lat: 3.5833, lng: 72.9333, address: "Main Street, Dhigurah" },
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791"
      ],
      amenities: ["Wi-Fi", "Air Conditioning", "Beach Access", "Whale Shark Tours", "Restaurant", "Laundry Service"],
      roomTypes: [
        { type: "Garden View Room", price: 75, capacity: 2 },
        { type: "Ocean View Room", price: 110, capacity: 3 },
        { type: "Beachfront Villa", price: 200, capacity: 4 }
      ],
      pricePerNight: "75.00",
      maxGuests: 20,
      rating: "4.60",
      reviewCount: 156,
      featured: true,
      contactInfo: { phone: "+960 7776543", email: "stay@oceanbreeze.mv" },
      policies: { checkIn: "15:00", checkOut: "11:30", cancellation: "Free cancellation up to 72 hours" }
    },
    {
      name: "Lagoon View Lodge",
      description: "Overlooking a stunning lagoon, our lodge offers comfortable accommodation with easy access to world-class diving sites and local island experiences.",
      atoll: "Baa Atoll",
      island: "Dharavandhoo",
      location: { lat: 5.1667, lng: 73.1333, address: "Lagoon Road, Dharavandhoo" },
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945"
      ],
      amenities: ["Wi-Fi", "Air Conditioning", "Diving Center", "Manta Ray Tours", "Restaurant", "Spa"],
      roomTypes: [
        { type: "Standard Room", price: 90, capacity: 2 },
        { type: "Superior Room", price: 130, capacity: 3 },
        { type: "Lagoon Suite", price: 190, capacity: 4 }
      ],
      pricePerNight: "90.00",
      maxGuests: 28,
      rating: "4.70",
      reviewCount: 203,
      featured: true,
      contactInfo: { phone: "+960 7774321", email: "info@lagoonview.mv" },
      policies: { checkIn: "14:00", checkOut: "12:00", cancellation: "Free cancellation up to 48 hours" }
    },
    {
      name: "Tropical Haven Guest House",
      description: "A cozy guest house nestled among tropical gardens, offering a peaceful retreat with easy access to pristine beaches and vibrant coral reefs.",
      atoll: "Lhaviyani Atoll",
      island: "Naifaru",
      location: { lat: 5.4444, lng: 73.3658, address: "Garden Street, Naifaru" },
      images: [
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
        "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72"
      ],
      amenities: ["Wi-Fi", "Air Conditioning", "Garden", "Restaurant", "Snorkeling Equipment", "Airport Transfer"],
      roomTypes: [
        { type: "Garden Room", price: 70, capacity: 2 },
        { type: "Deluxe Room", price: 100, capacity: 3 },
        { type: "Family Room", price: 140, capacity: 4 }
      ],
      pricePerNight: "70.00",
      maxGuests: 18,
      rating: "4.40",
      reviewCount: 67,
      featured: false,
      contactInfo: { phone: "+960 7772468", email: "book@tropicalhaven.mv" },
      policies: { checkIn: "13:00", checkOut: "11:00", cancellation: "Free cancellation up to 24 hours" }
    },
    {
      name: "Blue Horizon Inn",
      description: "Modern accommodation with traditional Maldivian touches. Enjoy water sports, cultural experiences, and stunning ocean views from every room.",
      atoll: "Dhaalu Atoll",
      island: "Kudahuvadhoo",
      location: { lat: 2.6708, lng: 72.8944, address: "Ocean Drive, Kudahuvadhoo" },
      images: [
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
        "https://images.unsplash.com/photo-1602002418082-a4443e081dd1"
      ],
      amenities: ["Wi-Fi", "Air Conditioning", "Beach Access", "Water Sports", "Restaurant", "Bar"],
      roomTypes: [
        { type: "Ocean View Room", price: 95, capacity: 2 },
        { type: "Premium Room", price: 135, capacity: 3 },
        { type: "Executive Suite", price: 195, capacity: 4 }
      ],
      pricePerNight: "95.00",
      maxGuests: 35,
      rating: "4.55",
      reviewCount: 142,
      featured: false,
      contactInfo: { phone: "+960 7779753", email: "reservations@bluehorizon.mv" },
      policies: { checkIn: "15:00", checkOut: "12:00", cancellation: "Free cancellation up to 48 hours" }
    },
    {
      name: "Island Dreams Guest House",
      description: "A boutique guest house offering personalized service and unforgettable island experiences. Perfect base for exploring local culture and marine life.",
      atoll: "North Malé Atoll",
      island: "Thulusdhoo",
      location: { lat: 4.3781, lng: 73.6453, address: "Surf Point, Thulusdhoo" },
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
      ],
      amenities: ["Wi-Fi", "Air Conditioning", "Surf School", "Restaurant", "Yoga Classes", "Bicycle Rental"],
      roomTypes: [
        { type: "Surf View Room", price: 80, capacity: 2 },
        { type: "Deluxe Room", price: 115, capacity: 3 },
        { type: "Penthouse Suite", price: 175, capacity: 4 }
      ],
      pricePerNight: "80.00",
      maxGuests: 22,
      rating: "4.65",
      reviewCount: 178,
      featured: true,
      contactInfo: { phone: "+960 7771357", email: "info@islanddreams.mv" },
      policies: { checkIn: "14:00", checkOut: "11:00", cancellation: "Free cancellation up to 72 hours" }
    },
    {
      name: "Palm Beach Resort & Guest House",
      description: "A perfect blend of comfort and affordability, surrounded by swaying palms and pristine beaches. Ideal for budget-conscious travelers.",
      atoll: "South Malé Atoll",
      island: "Gulhi",
      location: { lat: 3.9044, lng: 73.4386, address: "Palm Grove, Gulhi" },
      images: [
        "https://images.unsplash.com/photo-1568084680786-a84f91d1153c",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
      ],
      amenities: ["Wi-Fi", "Air Conditioning", "Beach Access", "Restaurant", "Fishing Trips", "BBQ Area"],
      roomTypes: [
        { type: "Budget Room", price: 60, capacity: 2 },
        { type: "Standard Room", price: 85, capacity: 3 },
        { type: "Beach Bungalow", price: 125, capacity: 4 }
      ],
      pricePerNight: "60.00",
      maxGuests: 26,
      rating: "4.25",
      reviewCount: 93,
      featured: false,
      contactInfo: { phone: "+960 7778642", email: "stay@palmbeach.mv" },
      policies: { checkIn: "13:00", checkOut: "11:00", cancellation: "Free cancellation up to 24 hours" }
    },
    {
      name: "Aqua Marina Guest House",
      description: "Dive into adventure at our guest house, renowned for exceptional diving experiences and comfortable accommodation in the heart of the Maldives.",
      atoll: "Ari Atoll",
      island: "Maamigili",
      location: { lat: 3.4708, lng: 72.8361, address: "Dive Center Road, Maamigili" },
      images: [
        "https://images.unsplash.com/photo-1596178065887-1198b6148b2b",
        "https://images.unsplash.com/photo-1611043714658-af3e56bc5299"
      ],
      amenities: ["Wi-Fi", "Air Conditioning", "PADI Dive Center", "Restaurant", "Equipment Rental", "Airport Transfer"],
      roomTypes: [
        { type: "Diver's Room", price: 75, capacity: 2 },
        { type: "Comfort Room", price: 105, capacity: 3 },
        { type: "Master Suite", price: 165, capacity: 4 }
      ],
      pricePerNight: "75.00",
      maxGuests: 24,
      rating: "4.50",
      reviewCount: 211,
      featured: true,
      contactInfo: { phone: "+960 7775319", email: "dive@aquamarina.mv" },
      policies: { checkIn: "14:00", checkOut: "12:00", cancellation: "Free cancellation up to 48 hours" }
    },
    {
      name: "Serenity Island Lodge",
      description: "Escape to tranquility at our eco-friendly lodge, where sustainable tourism meets luxury comfort. Experience the authentic Maldivian way of life.",
      atoll: "Baa Atoll",
      island: "Thulhaadhoo",
      location: { lat: 5.0667, lng: 73.0000, address: "Eco Village, Thulhaadhoo" },
      images: [
        "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa",
        "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d"
      ],
      amenities: ["Wi-Fi", "Air Conditioning", "Organic Restaurant", "Spa", "Cultural Tours", "Kayaking"],
      roomTypes: [
        { type: "Eco Room", price: 85, capacity: 2 },
        { type: "Garden Villa", price: 125, capacity: 3 },
        { type: "Ocean Villa", price: 185, capacity: 4 }
      ],
      pricePerNight: "85.00",
      maxGuests: 20,
      rating: "4.75",
      reviewCount: 167,
      featured: true,
      contactInfo: { phone: "+960 7773690", email: "book@serenityisland.mv" },
      policies: { checkIn: "15:00", checkOut: "11:00", cancellation: "Free cancellation up to 72 hours" }
    }
  ];

  try {
    console.log("Seeding guest houses...");
    await db.insert(guestHouses).values(guestHousesData);
    console.log("Successfully seeded", guestHousesData.length, "guest houses");
  } catch (error) {
    console.error("Error seeding guest houses:", error);
  }
};

// Run the seed function
seedGuestHouses().then(() => process.exit(0));