/*
  Warnings:

  - You are about to drop the `_LocalFileToTodo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `todoId` to the `local_files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_LocalFileToTodo" DROP CONSTRAINT "_LocalFileToTodo_A_fkey";

-- DropForeignKey
ALTER TABLE "_LocalFileToTodo" DROP CONSTRAINT "_LocalFileToTodo_B_fkey";

-- AlterTable
ALTER TABLE "local_files" ADD COLUMN     "todoId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_LocalFileToTodo";

-- AddForeignKey
ALTER TABLE "local_files" ADD CONSTRAINT "local_files_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "todos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
