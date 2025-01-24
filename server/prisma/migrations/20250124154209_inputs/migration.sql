/*
  Warnings:

  - You are about to drop the `Inputs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InputField" DROP CONSTRAINT "InputField_inputsId_fkey";

-- DropTable
DROP TABLE "Inputs";
