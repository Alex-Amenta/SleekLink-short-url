/*
  Warnings:

  - A unique constraint covering the columns `[originalUrl,user_id,anonymous_id]` on the table `url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `url_originalUrl_user_id_anonymous_id_key` ON `url`(`originalUrl`, `user_id`, `anonymous_id`);
