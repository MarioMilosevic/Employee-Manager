/*
  Warnings:

  - Made the column `inputsId` on table `InputField` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "InputField" DROP CONSTRAINT "InputField_inputsId_fkey";

-- AlterTable
ALTER TABLE "InputField" ALTER COLUMN "inputsId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "InputField" ADD CONSTRAINT "InputField_inputsId_fkey" FOREIGN KEY ("inputsId") REFERENCES "Inputs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
