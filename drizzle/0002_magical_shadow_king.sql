CREATE TABLE `boards` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `boards_id` PRIMARY KEY(`id`),
	CONSTRAINT `boards_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `tasks` ADD `boardId` int NOT NULL;