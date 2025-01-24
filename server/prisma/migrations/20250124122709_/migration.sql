/*
  Warnings:

  - The primary key for the `Inputs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `Inputs` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Inputs` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Inputs` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Inputs` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Inputs` table. All the data in the column will be lost.
  - You are about to drop the column `passwordConfirm` on the `Inputs` table. All the data in the column will be lost.
  - You are about to drop the column `startYear` on the `Inputs` table. All the data in the column will be lost.
  - The `id` column on the `Inputs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Inputs_email_key";

-- DropIndex
DROP INDEX "Inputs_id_key";

-- AlterTable
ALTER TABLE "Inputs" DROP CONSTRAINT "Inputs_pkey",
DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "passwordConfirm",
DROP COLUMN "startYear",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Inputs_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "InputField" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL,
    "inputsId" INTEGER,

    CONSTRAINT "InputField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InputField_id_key" ON "InputField"("id");

-- AddForeignKey
ALTER TABLE "InputField" ADD CONSTRAINT "InputField_inputsId_fkey" FOREIGN KEY ("inputsId") REFERENCES "Inputs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
