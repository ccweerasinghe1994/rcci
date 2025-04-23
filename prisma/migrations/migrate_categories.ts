import { prisma } from "@/prisma";

async function main() {
  console.log("Starting category migration...");

  // 1. Find all unique categories currently in use
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      category: true,
    },
  });

  const uniqueCategories = [
    ...new Set(articles.map((article) => article.category)),
  ];
  console.log(
    `Found ${
      uniqueCategories.length
    } unique categories: ${uniqueCategories.join(", ")}`
  );

  // 2. Create categories in the new Category table
  const categoryMap = new Map<string, string>(); // Map old category name to new category ID

  for (const categoryName of uniqueCategories) {
    // Create a slug from the category name
    const slug = categoryName.toLowerCase().replace(/\s+/g, "-");

    // Create the category
    const category = await prisma.category.create({
      data: {
        name: categoryName,
        slug,
        description: `Articles related to ${categoryName}`,
      },
    });

    categoryMap.set(categoryName, category.id);
    console.log(`Created category: ${categoryName} with ID: ${category.id}`);
  }

  // 3. Update each article to reference the appropriate category
  console.log("Updating articles with new category references...");

  for (const article of articles) {
    const categoryId = categoryMap.get(article.category);

    if (!categoryId) {
      console.error(
        `No category ID found for article ${article.id} with category ${article.category}`
      );
      continue;
    }

    await prisma.article.update({
      where: { id: article.id },
      data: { categoryId },
    });
  }

  console.log("Migration completed successfully!");
}

main()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
