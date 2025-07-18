/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duties` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualifications` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Post_title_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duties" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "hours" INTEGER,
ADD COLUMN     "jobType" TEXT,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "pay" TEXT,
ADD COLUMN     "presence" TEXT,
ADD COLUMN     "qualifications" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "summary" TEXT,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
