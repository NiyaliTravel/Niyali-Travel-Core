import { db } from "@/models/db";
import { guestHouses, packages, InsertGuestHouse, InsertPackage } from "@shared/schema";

const seedNewGuestHouses = async () => {
  console.log("Starting to seed new guest houses...");
  
  try {
    const newGuestHouses: InsertGuestHouse[] = [
      {
        name: "TME Retreat",
        description: "A luxurious beachfront retreat offering world-class amenities and personalized service. Experience the perfect blend of modern comfort and traditional Maldivian hospitality.",
        atoll: "North Malé Atoll",
        island: "Thulusdhoo",
        location: JSON.stringify({ lat: 4.3775, lng: 73.5873, address: "Thulusdhoo Island" }),
        images: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd",
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
        ],
        amenities: ["Wi-Fi", "Air Conditioning", "Beach Access", "Spa", "Restaurant", "Water Sports", "Diving Center"],
        roomTypes: [
          JSON.stringify({ type: "Deluxe Room", price: 150, capacity: 2 }),
          JSON.stringify({ type: "Beach Villa", price: 250, capacity: 3 }),
          JSON.stringify({ type: "Water Villa", price: 350, capacity: 4 })
        ],
        price: 150.00,
        maxGuests: 40,
        rating: 4.70,
        reviewCount: 201,
        featured: true,
        contactInfo: JSON.stringify({ phone: "+960 7784567", email: "info@tmeretreat.mv" }),
        policies: JSON.stringify({ checkIn: "14:00", checkOut: "12:00", cancellation: "Free cancellation up to 72 hours" })
      },
    ];

    const insertedGuestHouses = await db.insert(guestHouses).values(newGuestHouses).returning();
    console.log(`Inserted ${insertedGuestHouses.length} new guest houses`);

    const madiGrand = insertedGuestHouses.find(gh => gh.name === "Madi Grand Guest House");
    
    if (madiGrand) {
      const madiPackages: InsertPackage[] = [
        {
          name: "Romantic Lagoon Escape",
          description: "Perfect for couples & honeymooners. Includes house reef snorkeling and sunset dolphin cruise.",
          duration: "3 Nights",
          price: 431.25,
          inclusions: [
            "3 nights accommodation in Deluxe Double Room",
            "Daily breakfast",
            "House Reef Snorkeling ($51.75 value)",
            "Sunset Dolphin Cruise ($51.75 value)",
          ],
          maxGuests: 2,
          guestHouseIds: [madiGrand.id],
        },
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

seedNewGuestHouses()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });