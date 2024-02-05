ALTER TABLE `subtasks` MODIFY COLUMN `done` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` MODIFY COLUMN `priority` enum('P1','P2','P3','P4') NOT NULL DEFAULT 'P4';--> statement-breakpoint
ALTER TABLE `tasks` MODIFY COLUMN `done` boolean NOT NULL;