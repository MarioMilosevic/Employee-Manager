/*
  Warnings:

  - The primary key for the `Inputs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Inputs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Inputs" DROP CONSTRAINT "Inputs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Inputs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Inputs_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Inputs_id_key" ON "Inputs"("id");
