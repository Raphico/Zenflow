ALTER TABLE `statuses` MODIFY COLUMN `title` varchar(35) NOT NULL;--> statement-breakpoint
ALTER TABLE `subtasks` MODIFY COLUMN `title` varchar(35) NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` MODIFY COLUMN `title` varchar(35) NOT NULL;