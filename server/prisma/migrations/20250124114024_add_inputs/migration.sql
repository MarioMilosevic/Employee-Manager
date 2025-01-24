-- CreateTable
CREATE TABLE "Inputs" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "passwordConfirm" TEXT,
    "startYear" TEXT,
    "address" TEXT,

    CONSTRAINT "Inputs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inputs_email_key" ON "Inputs"("email");
