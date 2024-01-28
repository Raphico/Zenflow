CREATE TABLE `statuses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(20) NOT NULL,
	`boardId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `statuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `tasks` ADD `statusId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `status`;--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `boardId`;