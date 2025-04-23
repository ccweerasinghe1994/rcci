/*
  Warnings:

  - You are about to drop the column `category` on the `Article` table. All the data in the column will be lost.
  - Made the column `categoryId` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_categoryId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "category",
ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
