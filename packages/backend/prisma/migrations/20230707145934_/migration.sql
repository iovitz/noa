/*
  Warnings:

  - Added the required column `timestamp` to the `server_log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `server_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `server_log` ADD COLUMN `context` CHAR(20) NULL,
    ADD COLUMN `timestamp` DATETIME NOT NULL,
    ADD COLUMN `userId` CHAR(20) NOT NULL,
    MODIFY `logid` VARCHAR(191) NULL,
    MODIFY `content` TEXT NULL;
