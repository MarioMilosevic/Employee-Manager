/*
  Warnings:

  - You are about to drop the column `inputOptionsId` on the `InputField` table. All the data in the column will be lost.
  - You are about to drop the `InputOptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InputField" DROP CONSTRAINT "InputField_inputOptionsId_fkey";

-- AlterTable
ALTER TABLE "InputField" DROP COLUMN "inputOptionsId",
ADD COLUMN     "options" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "InputOptions";
