/*
  Warnings:

  - You are about to alter the column `timestamp` on the `server_log` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `userId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `user_profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userid]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userid]` on the table `user_profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userid` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_profile` DROP FOREIGN KEY `user_profile_uid_fkey`;

-- DropIndex
DROP INDEX `user_userId_key` ON `user`;

-- AlterTable
ALTER TABLE `server_log` MODIFY `timestamp` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `userId`,
    ADD COLUMN `userid` CHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `user_profile` DROP COLUMN `uid`,
    ADD COLUMN `userid` CHAR(20) NULL;

-- CreateTable
CREATE TABLE `session` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `session` CHAR(20) NOT NULL,
    `userid` CHAR(20) NOT NULL,

    UNIQUE INDEX `session_session_key`(`session`),
    UNIQUE INDEX `session_userid_key`(`userid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_userid_key` ON `user`(`userid`);

-- CreateIndex
CREATE UNIQUE INDEX `user_profile_userid_key` ON `user_profile`(`userid`);

-- AddForeignKey
ALTER TABLE `user_profile` ADD CONSTRAINT `user_profile_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;
