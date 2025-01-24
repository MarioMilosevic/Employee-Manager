/*
  Warnings:

  - The primary key for the `InputField` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `InputField` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "InputField_id_key";

-- AlterTable
ALTER TABLE "InputField" DROP CONSTRAINT "InputField_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "InputField_pkey" PRIMARY KEY ("id");
