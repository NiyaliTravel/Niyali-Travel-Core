import { db } from "@/models/db";
import { guestHouses } from "@shared/schema";

const seedGuestHouses = async () => {
  const guestHousesData = [
    {
      name: "Coral Beach Inn",
      description: "A charming beachfront guest house offering authentic Maldivian hospitality with modern comforts. Enjoy pristine beaches, crystal-clear waters, and personalized service.",
      atoll: "North Malé Atoll",
      island: "Hulhumalé",
      location: JSON.stringify({ lat: 4.2105, lng: 73.5409, address: "Beach Road, Hulhumalé" }),
      images: [
        "https://images.unsplash.com/photo-1540541338287-41700207dee6",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
      ],
      amenities: ["Wi-Fi", "Air Conditioning", "Beach Access", "Restaurant", "Spa", "Water Sports"],
      roomTypes: [
        JSON.stringify({ type: "Standard Room", price: 85, capacity: 2 }),
        JSON.stringify({ type: "Deluxe Room", price: 120, capacity: 3 }),
        JSON.stringify({ type: "Beach Villa", price: 180, capacity: 4 })
      ],
      price: 85.00,
      maxGuests: 30,
      rating: 4.50,
      reviewCount: 124,
      featured: true,
      contactInfo: JSON.stringify({ phone: "+960 7781234", email: "info@coralbeachinn.mv" }),
      policies: JSON.stringify({ checkIn: "14:00", checkOut: "12:00", cancellation: "Free cancellation up to 48 hours" })
    },
    {
      name: "Sunset Paradise Guest House",
      description: "Experience breathtaking sunsets and warm hospitality at our family-run guest house. Located on a quiet island with excellent snorkeling and diving spots nearby.",
      atoll: "South Malé Atoll",
      island: "Maafushi",
      location: JSON.stringify({ lat: 3.9444, lng: 73.4889, address: "Sunset Avenue, Maafushi" }),
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
      ],
      amenities: ["Wi-Fi", "Air Conditioning", "Diving Center", "Restaurant", "Bicycle Rental", "BBQ Area"],
      roomTypes: [
        JSON.stringify({ type: "Budget Room", price: 65, capacity: 2 }),
        JSON.stringify({ type: "Standard Room", price: 95, capacity: 3 }),
        JSON.stringify({ type: "Family Suite", price: 150, capacity: 5 })
      ],
      price: 65.00,
      maxGuests: 25,
      rating: 4.30,
      reviewCount: 89,
      featured: false,
      contactInfo: JSON.stringify({ phone: "+960 7789876", email: "book@sunsetparadise.mv" }),
      policies: JSON.stringify({ checkIn: "13:00", checkOut: "11:00", cancellation: "Free cancellation up to 24 hours" })
    },
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