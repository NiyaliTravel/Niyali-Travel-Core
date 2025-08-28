import { db } from "@/models/db";
import { pgTable, text, varchar, uuid, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Create islands table if it doesn't exist
const islands = pgTable("islands", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  atoll: text("atoll").notNull(),
  localName: text("local_name"),
  population: text("population"),
  area: text("area"), // in km²
  hasGuestHouses: boolean("has_guest_houses").default(false),
  numberOfGuestHouses: text("number_of_guest_houses"),
  distanceFromMale: text("distance_from_male"), // in km
  transportOptions: jsonb("transport_options"), // speedboat, seaplane, ferry
  popularActivities: text("popular_activities").array(),
  description: text("description"),
  coordinates: jsonb("coordinates"), // { lat, lng }
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

const seedIslands = async () => {
  const islandsData = [
    // North Malé Atoll
    {
      name: "Hulhumalé",
      atoll: "North Malé Atoll",
      localName: "ހުޅުމާލެ",
      population: "50,000+",
      area: "4",
      hasGuestHouses: true,
      numberOfGuestHouses: "15+",
      distanceFromMale: "7",
      transportOptions: { bus: true, taxi: true, ferry: true },
      popularActivities: ["Beach Activities", "Water Sports", "City Tours", "Shopping"],
      description: "A reclaimed island connected to the airport, popular for its modern infrastructure and beaches.",
      coordinates: { lat: 4.2105, lng: 73.5409 }
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
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Surfing", "Diving", "Snorkeling", "Coca-Cola Factory Visit"],
      description: "Famous for its surf break 'Cokes' and being home to the Coca-Cola factory in Maldives.",
      coordinates: { lat: 4.3781, lng: 73.6453 }
    },
    {
      name: "Himmafushi",
      atoll: "North Malé Atoll",
      localName: "ހިންމަފުށި",
      population: "1,800",
      area: "0.28",
      hasGuestHouses: true,
      numberOfGuestHouses: "6+",
      distanceFromMale: "17",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Surfing", "Diving", "Local Island Experience"],
      description: "A local island known for its surf spots and traditional Maldivian lifestyle.",
      coordinates: { lat: 4.3542, lng: 73.5819 }
    },

    // South Malé Atoll
    {
      name: "Maafushi",
      atoll: "South Malé Atoll",
      localName: "މާފުށި",
      population: "3,000",
      area: "1.27",
      hasGuestHouses: true,
      numberOfGuestHouses: "30+",
      distanceFromMale: "27",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Water Sports", "Diving", "Sandbank Visits", "Dolphin Watching"],
      description: "One of the most popular local islands for tourism with extensive guest house options.",
      coordinates: { lat: 3.9444, lng: 73.4889 }
    },
    {
      name: "Gulhi",
      atoll: "South Malé Atoll",
      localName: "ގުޅި",
      population: "800",
      area: "0.21",
      hasGuestHouses: true,
      numberOfGuestHouses: "5+",
      distanceFromMale: "21",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Beach Activities", "Snorkeling", "Local Culture"],
      description: "A small, peaceful island perfect for a quiet getaway.",
      coordinates: { lat: 3.9044, lng: 73.4386 }
    },
    {
      name: "Guraidhoo",
      atoll: "South Malé Atoll",
      localName: "ގުރައިދޫ",
      population: "1,800",
      area: "0.26",
      hasGuestHouses: true,
      numberOfGuestHouses: "10+",
      distanceFromMale: "30",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Surfing", "Diving", "Fishing", "Beach Activities"],
      description: "Known for its excellent surf breaks and diving sites.",
      coordinates: { lat: 3.8853, lng: 73.4667 }
    },

    // Ari Atoll
    {
      name: "Dhigurah",
      atoll: "Ari Atoll",
      localName: "ދިގުރަށް",
      population: "600",
      area: "3",
      hasGuestHouses: true,
      numberOfGuestHouses: "10+",
      distanceFromMale: "96",
      transportOptions: { speedboat: true, seaplane: true, ferry: true },
      popularActivities: ["Whale Shark Tours", "Diving", "Snorkeling", "Beach Activities"],
      description: "Famous for year-round whale shark sightings and one of the longest islands in Maldives.",
      coordinates: { lat: 3.5833, lng: 72.9333 }
    },
    {
      name: "Rasdhoo",
      atoll: "Ari Atoll",
      localName: "ރަސްދޫ",
      population: "1,000",
      area: "0.5",
      hasGuestHouses: true,
      numberOfGuestHouses: "8+",
      distanceFromMale: "60",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Diving", "Hammerhead Shark Diving", "Snorkeling"],
      description: "A diving paradise known for hammerhead shark sightings.",
      coordinates: { lat: 4.2619, lng: 72.9967 }
    },
    {
      name: "Ukulhas",
      atoll: "Ari Atoll",
      localName: "އުކުޅަސް",
      population: "1,000",
      area: "0.25",
      hasGuestHouses: true,
      numberOfGuestHouses: "7+",
      distanceFromMale: "72",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Beach Activities", "Diving", "Eco-Tourism"],
      description: "An eco-friendly island known for its cleanliness and environmental initiatives.",
      coordinates: { lat: 4.2167, lng: 72.8667 }
    },
    {
      name: "Maamigili",
      atoll: "Ari Atoll",
      localName: "މާމިގިލި",
      population: "2,500",
      area: "3.15",
      hasGuestHouses: true,
      numberOfGuestHouses: "5+",
      distanceFromMale: "80",
      transportOptions: { speedboat: true, domestic_flight: true },
      popularActivities: ["Whale Shark Tours", "Diving", "Local Culture"],
      description: "The largest island in South Ari Atoll with an airport.",
      coordinates: { lat: 3.4708, lng: 72.8361 }
    },
    {
      name: "Dhangethi",
      atoll: "Ari Atoll",
      localName: "ދަނގެތި",
      population: "800",
      area: "0.4",
      hasGuestHouses: true,
      numberOfGuestHouses: "6+",
      distanceFromMale: "87",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Whale Shark Tours", "Diving", "Fishing"],
      description: "A traditional fishing island with access to whale shark areas.",
      coordinates: { lat: 3.5908, lng: 72.9611 }
    },

    // Baa Atoll
    {
      name: "Dharavandhoo",
      atoll: "Baa Atoll",
      localName: "ދަރަވަންދޫ",
      population: "1,200",
      area: "0.63",
      hasGuestHouses: true,
      numberOfGuestHouses: "8+",
      distanceFromMale: "120",
      transportOptions: { speedboat: true, seaplane: true, domestic_flight: true },
      popularActivities: ["Hanifaru Bay Tours", "Manta Ray Snorkeling", "Diving"],
      description: "Gateway to Hanifaru Bay, famous UNESCO Biosphere Reserve for manta rays.",
      coordinates: { lat: 5.1667, lng: 73.1333 }
    },
    {
      name: "Thulhaadhoo",
      atoll: "Baa Atoll",
      localName: "ތުޅާދޫ",
      population: "1,500",
      area: "0.57",
      hasGuestHouses: true,
      numberOfGuestHouses: "5+",
      distanceFromMale: "108",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Lacquerwork Crafts", "Beach Activities", "Local Culture"],
      description: "Famous for traditional lacquerwork handicrafts.",
      coordinates: { lat: 5.0667, lng: 73.0000 }
    },
    {
      name: "Fehendhoo",
      atoll: "Baa Atoll",
      localName: "ފެހެންދޫ",
      population: "250",
      area: "0.11",
      hasGuestHouses: true,
      numberOfGuestHouses: "3+",
      distanceFromMale: "115",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Fishing", "Beach Activities", "Island Hopping"],
      description: "A small, quiet island perfect for experiencing local life.",
      coordinates: { lat: 5.1333, lng: 73.0833 }
    },

    // Lhaviyani Atoll
    {
      name: "Naifaru",
      atoll: "Lhaviyani Atoll",
      localName: "ނައިފަރު",
      population: "5,000",
      area: "0.54",
      hasGuestHouses: true,
      numberOfGuestHouses: "4+",
      distanceFromMale: "142",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Diving", "Local Culture", "Traditional Crafts"],
      description: "The capital of Lhaviyani Atoll with traditional boat building.",
      coordinates: { lat: 5.4444, lng: 73.3658 }
    },
    {
      name: "Hinnavaru",
      atoll: "Lhaviyani Atoll",
      localName: "ހިންނަވަރު",
      population: "4,500",
      area: "0.41",
      hasGuestHouses: true,
      numberOfGuestHouses: "3+",
      distanceFromMale: "147",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Beach Activities", "Local Culture", "Fishing"],
      description: "A densely populated island with rich local culture.",
      coordinates: { lat: 5.5175, lng: 73.3847 }
    },

    // Dhaalu Atoll
    {
      name: "Kudahuvadhoo",
      atoll: "Dhaalu Atoll",
      localName: "ކުޑަހުވަދޫ",
      population: "3,000",
      area: "0.62",
      hasGuestHouses: true,
      numberOfGuestHouses: "5+",
      distanceFromMale: "180",
      transportOptions: { speedboat: true, domestic_flight: true },
      popularActivities: ["Historical Sites", "Beach Activities", "Local Culture"],
      description: "Historical island with ancient mosque and Buddhist ruins.",
      coordinates: { lat: 2.6708, lng: 72.8944 }
    },

    // Vaavu Atoll
    {
      name: "Fulidhoo",
      atoll: "Vaavu Atoll",
      localName: "ފުލިދޫ",
      population: "400",
      area: "0.21",
      hasGuestHouses: true,
      numberOfGuestHouses: "4+",
      distanceFromMale: "63",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Diving", "Nurse Shark Snorkeling", "Beach Activities"],
      description: "A small island famous for its house reef and marine life.",
      coordinates: { lat: 3.7194, lng: 73.4264 }
    },
    {
      name: "Thinadhoo",
      atoll: "Vaavu Atoll",
      localName: "ތިނަދޫ",
      population: "200",
      area: "0.17",
      hasGuestHouses: true,
      numberOfGuestHouses: "2+",
      distanceFromMale: "70",
      transportOptions: { speedboat: true },
      popularActivities: ["Diving", "Fishing", "Island Life"],
      description: "A tiny island offering authentic local experience.",
      coordinates: { lat: 3.5833, lng: 73.3667 }
    },

    // Meemu Atoll
    {
      name: "Muli",
      atoll: "Meemu Atoll",
      localName: "މުލި",
      population: "900",
      area: "0.73",
      hasGuestHouses: true,
      numberOfGuestHouses: "3+",
      distanceFromMale: "115",
      transportOptions: { speedboat: true, ferry: true },
      popularActivities: ["Diving", "Fishing", "Beach Activities"],
      description: "The capital of Meemu Atoll with pristine beaches.",
      coordinates: { lat: 2.9167, lng: 73.5667 }
    },

    // Addu City (Seenu Atoll)
    {
      name: "Gan",
      atoll: "Addu City",
      localName: "ގަން",
      population: "5,000",
      area: "2.26",
      hasGuestHouses: true,
      numberOfGuestHouses: "6+",
      distanceFromMale: "540",
      transportOptions: { domestic_flight: true },
      popularActivities: ["Historical Sites", "Cycling", "Nature Tours"],
      description: "Connected island with British colonial history and nature reserves.",
      coordinates: { lat: -0.6933, lng: 73.1544 }
    },
    {
      name: "Maradhoo",
      atoll: "Addu City",
      localName: "މަރަދޫ",
      population: "2,500",
      area: "0.88",
      hasGuestHouses: true,
      numberOfGuestHouses: "3+",
      distanceFromMale: "538",
      transportOptions: { domestic_flight: true, road: true },
      popularActivities: ["Beach Activities", "Local Culture", "Cycling"],
      description: "Part of Addu City connected by causeways.",
      coordinates: { lat: -0.6667, lng: 73.1333 }
    },

    // Gaafu Alifu Atoll
    {
      name: "Dhevvadhoo",
      atoll: "Gaafu Alifu Atoll",
      localName: "ދެއްވަދޫ",
      population: "1,200",
      area: "0.5",
      hasGuestHouses: true,
      numberOfGuestHouses: "3+",
      distanceFromMale: "400",
      transportOptions: { speedboat: true, domestic_flight: true },
      popularActivities: ["Diving", "Fishing", "Beach Activities"],
      description: "A traditional island in the southern atolls.",
      coordinates: { lat: 0.5833, lng: 73.2167 }
    },

    // Gaafu Dhaalu Atoll
    {
      name: "Thinadhoo",
      atoll: "Gaafu Dhaalu Atoll",
      localName: "ތިނަދޫ",
      population: "7,000",
      area: "3.88",
      hasGuestHouses: true,
      numberOfGuestHouses: "4+",
      distanceFromMale: "408",
      transportOptions: { speedboat: true, domestic_flight: true },
      popularActivities: ["Local Culture", "Shopping", "Beach Activities"],
      description: "The capital of Gaafu Dhaalu Atoll and major population center.",
      coordinates: { lat: 0.5308, lng: 72.9969 }
    },

    // Laamu Atoll
    {
      name: "Fonadhoo",
      atoll: "Laamu Atoll",
      localName: "ފޮނަދޫ",
      population: "1,800",
      area: "0.51",
      hasGuestHouses: true,
      numberOfGuestHouses: "3+",
      distanceFromMale: "260",
      transportOptions: { speedboat: true, domestic_flight: true },
      popularActivities: ["Beach Activities", "Local Culture", "Fishing"],
      description: "The capital of Laamu Atoll with beautiful beaches.",
      coordinates: { lat: 1.8333, lng: 73.5000 }
    },
    {
      name: "Gan",
      atoll: "Laamu Atoll",
      localName: "ގަން",
      population: "3,500",
      area: "2.14",
      hasGuestHouses: true,
      numberOfGuestHouses: "4+",
      distanceFromMale: "250",
      transportOptions: { speedboat: true, domestic_flight: true },
      popularActivities: ["Agriculture Tours", "Cycling", "Beach Activities"],
      description: "The largest island in Laamu Atoll known for agriculture.",
      coordinates: { lat: 1.9244, lng: 73.5544 }
    }
  ];

  try {
    console.log("Seeding islands...");
    
    // First, ensure the table exists
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS islands (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        atoll TEXT NOT NULL,
        local_name TEXT,
        population TEXT,
        area TEXT,
        has_guest_houses BOOLEAN DEFAULT false,
        number_of_guest_houses TEXT,
        distance_from_male TEXT,
        transport_options JSONB,
        popular_activities TEXT[],
        description TEXT,
        coordinates JSONB,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Insert islands data
    for (const island of islandsData) {
      await db.execute(sql`
        INSERT INTO islands (
          name, atoll, local_name, population, area, has_guest_houses,
          number_of_guest_houses, distance_from_male, transport_options,
          popular_activities, description, coordinates, is_active
        ) VALUES (
          ${island.name},
          ${island.atoll},
          ${island.localName},
          ${island.population},
          ${island.area},
          ${island.hasGuestHouses},
          ${island.numberOfGuestHouses},
          ${island.distanceFromMale},
          ${JSON.stringify(island.transportOptions)}::jsonb,
          ARRAY[${island.popularActivities.join(',')}]::text[],
          ${island.description},
          ${JSON.stringify(island.coordinates)}::jsonb,
          true
        )
      `);
    }
    
    console.log("Successfully seeded", islandsData.length, "islands");
  } catch (error) {
    console.error("Error seeding islands:", error);
  }
};

// Run the seed function
seedIslands().then(() => process.exit(0));