-- CreateTable
CREATE TABLE "files_on_todos" (
    "todoId" TEXT NOT NULL,
    "localFileId" TEXT NOT NULL,

    CONSTRAINT "files_on_todos_pkey" PRIMARY KEY ("todoId","localFileId")
);

-- CreateTable
CREATE TABLE "local_files" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,

    CONSTRAINT "local_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "files_on_todos" ADD CONSTRAINT "files_on_todos_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "todos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files_on_todos" ADD CONSTRAINT "files_on_todos_localFileId_fkey" FOREIGN KEY ("localFileId") REFERENCES "local_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
