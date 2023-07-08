/*
  Warnings:

  - You are about to drop the column `content` on the `server_log` table. All the data in the column will be lost.
  - You are about to alter the column `expires` on the `session` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `server_log` DROP COLUMN `content`;

-- AlterTable
ALTER TABLE `session` MODIFY `expires` TIMESTAMP NOT NULL;
