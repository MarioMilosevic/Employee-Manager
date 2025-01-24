-- AlterTable
ALTER TABLE "InputField" ADD COLUMN     "inputsId" TEXT;

-- CreateTable
CREATE TABLE "Inputs" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Inputs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inputs_id_key" ON "Inputs"("id");

-- AddForeignKey
ALTER TABLE "InputField" ADD CONSTRAINT "InputField_inputsId_fkey" FOREIGN KEY ("inputsId") REFERENCES "Inputs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
