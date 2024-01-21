ALTER TABLE `boards` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `boards` MODIFY COLUMN `updatedAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `subtasks` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `subtasks` MODIFY COLUMN `updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `tasks` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `tasks` MODIFY COLUMN `updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP;