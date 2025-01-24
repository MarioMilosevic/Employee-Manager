/*
  Warnings:

  - You are about to drop the column `inputsId` on the `InputField` table. All the data in the column will be lost.
  - You are about to drop the `Inputs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InputField" DROP CONSTRAINT "InputField_inputsId_fkey";

-- AlterTable
ALTER TABLE "InputField" DROP COLUMN "inputsId";

-- DropTable
DROP TABLE "Inputs";
