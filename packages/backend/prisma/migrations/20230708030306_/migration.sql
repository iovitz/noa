/*
  Warnings:

  - You are about to drop the column `content` on the `client_log` table. All the data in the column will be lost.
  - You are about to alter the column `expires` on the `session` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `header` to the `client_log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `params` to the `client_log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `client_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client_log` DROP COLUMN `content`,
    ADD COLUMN `header` TEXT NOT NULL,
    ADD COLUMN `params` TEXT NOT NULL,
    ADD COLUMN `timestamp` BIGINT UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `server_log` MODIFY `timestamp` BIGINT UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `session` MODIFY `expires` TIMESTAMP NOT NULL;
