/*
  Warnings:

  - Added the required column `item_subcategory` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "item_subcategory" TEXT NOT NULL;
