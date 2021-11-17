/*
  Warnings:

  - You are about to drop the column `email` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `CustomerAuth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `CustomerAuth` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customer_email_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "CustomerAuth" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAuth_email_key" ON "CustomerAuth"("email");
