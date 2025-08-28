import { db } from "@/models/db";
import { users } from "@shared/schema";
import bcrypt from "bcryptjs";

async function seedAdminUser() {
  try {
    // Check if admin user already exists
    const existingAdmin = await db.select().from(users).where(eq(users.email, "admin@niyalitravel.com"));
    
    if (existingAdmin.length > 0) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user with hashed password
    const hashedPassword = await bcrypt.hash("NiyaliAdmin2025!", 10);
    
    const adminUser = await db.insert(users).values({
      username: "admin",
      email: "admin@niyalitravel.com",
      password: hashedPassword,
      firstName: "Niyali",
      lastName: "Admin",
      role: "admin",
      isAdmin: true,
      isVerified: true,
      phone: "+9609107338",
      country: "Maldives"
    }).returning();

    console.log("Admin user created successfully:");
    console.log("Email: admin@niyalitravel.com");
    console.log("Password: NiyaliAdmin2025!");
    console.log("Please change this password after first login!");
    
    return adminUser[0];
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
}

// Import eq from drizzle-orm
import { eq } from "drizzle-orm";

// Run the seed function
seedAdminUser().then(() => {
  console.log("Admin seeding completed");
  process.exit(0);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});