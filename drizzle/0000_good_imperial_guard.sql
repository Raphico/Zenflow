CREATE TABLE `boards` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(191) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `boards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subtasks` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(20) NOT NULL,
	`done` boolean DEFAULT false,
	`dueDate` datetime,
	`taskId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subtasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191) NOT NULL,
	`title` varchar(20) NOT NULL,
	`description` varchar(150),
	`priority` enum('P1','P2','P3','P4') DEFAULT 'P4',
	`status` varchar(25) NOT NULL,
	`tags` varchar(25),
	`dueDate` datetime,
	`boardId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
