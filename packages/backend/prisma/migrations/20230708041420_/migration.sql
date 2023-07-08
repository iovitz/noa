/*
  Warnings:

  - You are about to alter the column `expires` on the `session` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `stack` to the `server_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `server_log` ADD COLUMN `stack` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `session` MODIFY `expires` TIMESTAMP NOT NULL;
