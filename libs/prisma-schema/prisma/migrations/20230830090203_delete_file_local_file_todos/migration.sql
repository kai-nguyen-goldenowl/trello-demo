/*
  Warnings:

  - You are about to drop the `files_on_todos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "files_on_todos" DROP CONSTRAINT "files_on_todos_localFileId_fkey";

-- DropForeignKey
ALTER TABLE "files_on_todos" DROP CONSTRAINT "files_on_todos_todoId_fkey";

-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_ownerId_fkey";

-- DropTable
DROP TABLE "files_on_todos";

-- CreateTable
CREATE TABLE "_LocalFileToTodo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LocalFileToTodo_AB_unique" ON "_LocalFileToTodo"("A", "B");

-- CreateIndex
CREATE INDEX "_LocalFileToTodo_B_index" ON "_LocalFileToTodo"("B");

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocalFileToTodo" ADD CONSTRAINT "_LocalFileToTodo_A_fkey" FOREIGN KEY ("A") REFERENCES "local_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocalFileToTodo" ADD CONSTRAINT "_LocalFileToTodo_B_fkey" FOREIGN KEY ("B") REFERENCES "todos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
