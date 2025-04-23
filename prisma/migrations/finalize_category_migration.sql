-- Make categoryId required
ALTER TABLE "Article" ALTER COLUMN "categoryId" SET NOT NULL;

-- Drop the original category column
ALTER TABLE "Article" DROP COLUMN "category"; 