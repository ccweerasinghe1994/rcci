-- Create the Category table
CREATE TABLE "Category" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- Add unique constraints to Category
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- Add categoryId column to Article table
ALTER TABLE "Article" ADD COLUMN "categoryId" UUID;

-- Insert initial categories based on existing article categories
-- This will be done with a script

-- After data migration is done via script, make categoryId required and add foreign key constraint
-- These commands will be run after the data migration script:
-- ALTER TABLE "Article" ALTER COLUMN "categoryId" SET NOT NULL;
-- ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- ALTER TABLE "Article" DROP COLUMN "category"; 