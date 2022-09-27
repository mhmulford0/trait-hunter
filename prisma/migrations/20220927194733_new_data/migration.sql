/*
  Warnings:

  - Added the required column `accessory` to the `Lil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backgroundColor` to the `Lil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `glasses` to the `Lil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Lil` ADD COLUMN `accessory` VARCHAR(191) NOT NULL,
    ADD COLUMN `backgroundColor` VARCHAR(191) NOT NULL,
    ADD COLUMN `glasses` VARCHAR(191) NOT NULL;
