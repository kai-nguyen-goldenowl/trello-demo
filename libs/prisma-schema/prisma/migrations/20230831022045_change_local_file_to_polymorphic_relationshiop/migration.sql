/*
  Warnings:

  - You are about to drop the column `todoId` on the `local_files` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `local_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerType` to the `local_files` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LocalFileType" AS ENUM ('Todo');

-- DropForeignKey
ALTER TABLE "local_files" DROP CONSTRAINT "local_files_todoId_fkey";

-- AlterTable
ALTER TABLE "local_files" DROP COLUMN "todoId",
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "ownerType" "LocalFileType" NOT NULL;

-- AddForeignKey
ALTER TABLE "local_files" ADD CONSTRAINT "local_files_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "todos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
