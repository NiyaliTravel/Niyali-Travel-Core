import { db } from "@/models/db";
import { islands } from "@shared/schema";

const seedIslands = async () => {
  const islandsData = [
    {
      name: "Hulhumalé",
      atoll: "North Malé Atoll",
      localName: "ހުޅުމާލެ",
      population: "50,000+",
      area: "4",
      hasGuestHouses: true,
      numberOfGuestHouses: "15+",
      distanceFromMale: "7",
      transportOptions: JSON.stringify({ bus: true, taxi: true, ferry: true }),
      popularActivities: ["Beach Activities", "Water Sports", "City Tours", "Shopping"],
      description: "A reclaimed island connected to the airport, popular for its modern infrastructure and beaches.",
      coordinates: JSON.stringify({ lat: 4.2105, lng: 73.5409 })
    },
    {
      name: "Thulusdhoo",
      atoll: "North Malé Atoll",
      localName: "ތުލުސްދޫ",
      population: "1,400",
      area: "0.32",
      hasGuestHouses: true,
      numberOfGuestHouses: "8+",
      distanceFromMale: "27",
      transportOptions: JSON.stringify({ speedboat: true, ferry: true }),
      popularActivities: ["Surfing", "Diving", "Snorkeling", "Coca-Cola Factory Visit"],
      description: "Famous for its surf break 'Cokes' and being home to the Coca-Cola factory in Maldives.",
      coordinates: JSON.stringify({ lat: 4.3781, lng: 73.6453 })
    },
  ];

  try {
    console.log("Seeding islands...");
    await db.insert(islands).values(islandsData);
    console.log("Successfully seeded", islandsData.length, "islands");
  } catch (error) {
    console.error("Error seeding islands:", error);
  }
};

// Run the seed function
seedIslands().then(() => process.exit(0));