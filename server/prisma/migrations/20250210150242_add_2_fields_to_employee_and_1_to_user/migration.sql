-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('Contractor', 'Part', 'Full');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('Engineering', 'HR', 'Sales');

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "department" "Department" NOT NULL DEFAULT 'Engineering',
ADD COLUMN     "employmentStatus" "EmploymentStatus" NOT NULL DEFAULT 'Full';
