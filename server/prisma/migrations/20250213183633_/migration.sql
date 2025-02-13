/*
  Warnings:

  - You are about to drop the column `employmentStatus` on the `employees` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Employment" AS ENUM ('Contractor', 'Part', 'Full');

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "employmentStatus",
ADD COLUMN     "employment" "Employment" NOT NULL DEFAULT 'Full';

-- DropEnum
DROP TYPE "EmploymentStatus";
