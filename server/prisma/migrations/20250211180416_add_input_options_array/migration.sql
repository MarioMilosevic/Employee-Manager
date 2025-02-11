-- AlterTable
ALTER TABLE "InputField" ADD COLUMN     "inputOptionsId" INTEGER;

-- CreateTable
CREATE TABLE "InputOptions" (
    "id" SERIAL NOT NULL,
    "option" TEXT[],

    CONSTRAINT "InputOptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InputField" ADD CONSTRAINT "InputField_inputOptionsId_fkey" FOREIGN KEY ("inputOptionsId") REFERENCES "InputOptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
