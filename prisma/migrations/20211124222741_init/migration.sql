-- CreateTable
CREATE TABLE "Patients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "app" BOOLEAN NOT NULL,
    "certificateID" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
