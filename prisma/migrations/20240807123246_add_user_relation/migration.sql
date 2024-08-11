-- CreateTable
CREATE TABLE `clicks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url_id` VARCHAR(191) NOT NULL,
    `clickedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `url_id`(`url_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `url` (
    `id` VARCHAR(32) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `originalUrl` VARCHAR(255) NOT NULL,
    `shortCode` VARCHAR(255) NOT NULL,
    `shortUrl` VARCHAR(255) NOT NULL,
    `countClick` INTEGER NULL DEFAULT 0,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `active` BOOLEAN NULL DEFAULT false,
    `user_id` VARCHAR(32) NULL,
    `anonymous_id` VARCHAR(255) NULL,
    `expirationDate` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(32) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `password_hash` TEXT NULL,
    `isAdmin` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `id_unique`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clicks` ADD CONSTRAINT `clicks_ibfk_1` FOREIGN KEY (`url_id`) REFERENCES `url`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `url` ADD CONSTRAINT `url_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
