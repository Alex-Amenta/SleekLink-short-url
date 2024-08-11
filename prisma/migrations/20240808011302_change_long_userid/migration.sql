-- DropForeignKey
ALTER TABLE `url` DROP FOREIGN KEY `url_user_id_fkey`;

-- AlterTable
ALTER TABLE `url` MODIFY `user_id` VARCHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `url` ADD CONSTRAINT `url_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
