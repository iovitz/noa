/*
  Warnings:

  - You are about to alter the column `timestamp` on the `server_log` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `expires` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `session_userid_fkey`;

-- AlterTable
ALTER TABLE `server_log` MODIFY `timestamp` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `session` ADD COLUMN `expires` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE CASCADE ON UPDATE CASCADE;
