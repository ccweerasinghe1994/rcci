import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Check if any banner exists
  const existingBanner = await prisma.banner.findFirst();

  if (!existingBanner) {
    console.log("Seeding default banner...");

    // Create default banner
    await prisma.banner.create({
      data: {
        title: "Rodrigues re-imagined",
        content:
          "All over the world, the private sector is a major driver of industrial development, economic growth and social integration and well-being. The Rodrigues Chamber of Commerce and Industry provides a platform of self-organisation and representation to inspire and support Rodriguan businesses in their drive towards an inclusive and sustainable development.",
        buttonText: "JOIN THE CHAMBER",
        buttonLink: "/join",
        active: true,
      },
    });
  } else {
    console.log("Banner already exists, skipping seed.");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
