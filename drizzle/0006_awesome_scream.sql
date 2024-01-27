ALTER TABLE `boards` ADD `userId` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `userId`;