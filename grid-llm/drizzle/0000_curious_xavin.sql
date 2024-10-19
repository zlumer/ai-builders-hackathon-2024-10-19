-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ops" (
	"collection" text NOT NULL,
	"doc_id" text NOT NULL,
	"doc_type" text NOT NULL,
	"version" integer NOT NULL,
	"operation" text NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "snapshots" (
	"collection" text NOT NULL,
	"doc_id" text NOT NULL,
	"doc_type" text NOT NULL,
	"version" integer NOT NULL,
	"data" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reference" (
	"id" text PRIMARY KEY NOT NULL,
	"from_field_id" text NOT NULL,
	"to_field_id" text NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attachments" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"hash" text NOT NULL,
	"size" integer NOT NULL,
	"mimetype" text NOT NULL,
	"path" text NOT NULL,
	"width" integer,
	"height" integer,
	"deleted_time" timestamp(3),
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" text NOT NULL,
	"last_modified_by" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attachments_table" (
	"id" text PRIMARY KEY NOT NULL,
	"attachment_id" text NOT NULL,
	"name" text NOT NULL,
	"token" text NOT NULL,
	"table_id" text NOT NULL,
	"record_id" text NOT NULL,
	"field_id" text NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" text NOT NULL,
	"last_modified_by" text,
	"last_modified_time" timestamp(3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification" (
	"id" text PRIMARY KEY NOT NULL,
	"from_user_id" text NOT NULL,
	"to_user_id" text NOT NULL,
	"type" text NOT NULL,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" text NOT NULL,
	"url_path" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"base_id" text,
	"space_id" text,
	"type" text NOT NULL,
	"role" text NOT NULL,
	"invitation_code" text NOT NULL,
	"expired_time" timestamp(3),
	"create_by" text NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"last_modified_time" timestamp(3),
	"last_modified_by" text,
	"deleted_time" timestamp(3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invitation_record" (
	"id" text PRIMARY KEY NOT NULL,
	"invitation_id" text NOT NULL,
	"base_id" text,
	"space_id" text,
	"type" text NOT NULL,
	"inviter" text NOT NULL,
	"accepter" text NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "access_token" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"user_id" text NOT NULL,
	"scopes" text NOT NULL,
	"space_ids" text,
	"base_ids" text,
	"sign" text NOT NULL,
	"expired_time" timestamp(3) NOT NULL,
	"last_used_time" timestamp(3),
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"last_modified_time" timestamp(3),
	"client_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collaborator" (
	"id" text PRIMARY KEY NOT NULL,
	"role_name" text NOT NULL,
	"user_id" text NOT NULL,
	"created_by" text NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"last_modified_time" timestamp(3),
	"last_modified_by" text,
	"resource_id" text NOT NULL,
	"resource_type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "base" (
	"id" text PRIMARY KEY NOT NULL,
	"space_id" text NOT NULL,
	"name" text NOT NULL,
	"order" double precision NOT NULL,
	"icon" text,
	"schema_pass" text,
	"deleted_time" timestamp(3),
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" text NOT NULL,
	"last_modified_by" text,
	"last_modified_time" timestamp(3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "table_meta" (
	"id" text PRIMARY KEY NOT NULL,
	"base_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"icon" text,
	"db_table_name" text NOT NULL,
	"version" integer NOT NULL,
	"order" double precision NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"last_modified_time" timestamp(3),
	"deleted_time" timestamp(3),
	"created_by" text NOT NULL,
	"last_modified_by" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "view" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"table_id" text NOT NULL,
	"type" text NOT NULL,
	"sort" text,
	"filter" text,
	"group" text,
	"options" text,
	"order" double precision NOT NULL,
	"version" integer NOT NULL,
	"column_meta" text NOT NULL,
	"enable_share" boolean,
	"share_id" text,
	"share_meta" text,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"last_modified_time" timestamp(3),
	"deleted_time" timestamp(3),
	"created_by" text NOT NULL,
	"last_modified_by" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_id" text NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "space" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"deleted_time" timestamp(3),
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" text NOT NULL,
	"last_modified_by" text,
	"last_modified_time" timestamp(3),
	"credit" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "field" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"options" text,
	"type" text NOT NULL,
	"cell_value_type" text NOT NULL,
	"is_multiple_cell_value" boolean,
	"db_field_type" text NOT NULL,
	"db_field_name" text NOT NULL,
	"not_null" boolean,
	"unique" boolean,
	"is_primary" boolean,
	"is_computed" boolean,
	"is_lookup" boolean,
	"is_pending" boolean,
	"has_error" boolean,
	"lookup_linked_field_id" text,
	"lookup_options" text,
	"table_id" text NOT NULL,
	"version" integer NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"last_modified_time" timestamp(3),
	"deleted_time" timestamp(3),
	"created_by" text NOT NULL,
	"last_modified_by" text,
	"order" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pin_resource" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"resource_id" text NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" text NOT NULL,
	"order" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth_app" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text,
	"homepage" text NOT NULL,
	"description" text,
	"client_id" text NOT NULL,
	"redirect_uris" text,
	"scopes" text,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"last_modified_time" timestamp(3),
	"created_by" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "setting" (
	"instance_id" text PRIMARY KEY NOT NULL,
	"disallow_sign_up" boolean,
	"disallow_space_creation" boolean,
	"disallow_space_invitation" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth_app_authorized" (
	"id" text PRIMARY KEY NOT NULL,
	"client_id" text NOT NULL,
	"user_id" text NOT NULL,
	"authorized_time" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth_app_secret" (
	"id" text PRIMARY KEY NOT NULL,
	"client_id" text NOT NULL,
	"secret" text NOT NULL,
	"masked_secret" text NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" text NOT NULL,
	"last_used_time" timestamp(3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth_app_token" (
	"id" text PRIMARY KEY NOT NULL,
	"app_secret_id" text NOT NULL,
	"refresh_token_sign" text NOT NULL,
	"expired_time" timestamp(3) NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"password" text,
	"salt" text,
	"phone" text,
	"email" text NOT NULL,
	"avatar" text,
	"notify_meta" text,
	"last_sign_time" timestamp(3),
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_time" timestamp(3),
	"last_modified_time" timestamp(3),
	"deactivated_time" timestamp(3),
	"is_admin" boolean,
	"is_system" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "record_history" (
	"id" text PRIMARY KEY NOT NULL,
	"table_id" text NOT NULL,
	"record_id" text NOT NULL,
	"field_id" text NOT NULL,
	"before" text NOT NULL,
	"after" text NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trash" (
	"id" text PRIMARY KEY NOT NULL,
	"resource_type" text NOT NULL,
	"resource_id" text NOT NULL,
	"parent_id" text,
	"deleted_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_by" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dashboard" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"base_id" text NOT NULL,
	"layout" text,
	"created_by" text NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"last_modified_time" timestamp(3),
	"last_modified_by" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plugin" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"detail_desc" text,
	"logo" text NOT NULL,
	"help_url" text,
	"status" text NOT NULL,
	"positions" text NOT NULL,
	"url" text,
	"secret" text NOT NULL,
	"masked_secret" text NOT NULL,
	"i18n" text,
	"plugin_user" text,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"last_modified_time" timestamp(3),
	"created_by" text NOT NULL,
	"last_modified_by" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plugin_install" (
	"id" text PRIMARY KEY NOT NULL,
	"plugin_id" text NOT NULL,
	"base_id" text NOT NULL,
	"name" text NOT NULL,
	"position_id" text NOT NULL,
	"position" text NOT NULL,
	"storage" text,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" text NOT NULL,
	"last_modified_time" timestamp(3),
	"last_modified_by" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"id" text PRIMARY KEY NOT NULL,
	"table_id" text NOT NULL,
	"record_id" text NOT NULL,
	"quote_Id" text,
	"content" text,
	"reaction" text,
	"deleted_time" timestamp(3),
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" text NOT NULL,
	"last_modified_time" timestamp(3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment_subscription" (
	"table_id" text NOT NULL,
	"record_id" text NOT NULL,
	"created_by" text NOT NULL,
	"created_time" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collaborator" ADD CONSTRAINT "collaborator_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "base" ADD CONSTRAINT "base_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "public"."space"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "table_meta" ADD CONSTRAINT "table_meta_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "public"."base"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "view" ADD CONSTRAINT "view_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "public"."table_meta"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "field" ADD CONSTRAINT "field_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "public"."table_meta"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plugin_install" ADD CONSTRAINT "plugin_install_plugin_id_fkey" FOREIGN KEY ("plugin_id") REFERENCES "public"."plugin"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ops_collection_created_time_idx" ON "ops" USING btree ("collection","created_time");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ops_collection_doc_id_version_key" ON "ops" USING btree ("collection","doc_id","version");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "snapshots_collection_doc_id_key" ON "snapshots" USING btree ("collection","doc_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reference_from_field_id_idx" ON "reference" USING btree ("from_field_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "reference_to_field_id_from_field_id_key" ON "reference" USING btree ("to_field_id","from_field_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reference_to_field_id_idx" ON "reference" USING btree ("to_field_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "attachments_token_key" ON "attachments" USING btree ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notification_to_user_id_is_read_created_time_idx" ON "notification" USING btree ("to_user_id","is_read","created_time");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "collaborator_resource_type_resource_id_user_id_key" ON "collaborator" USING btree ("resource_type","resource_id","user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "base_order_idx" ON "base" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "table_meta_order_idx" ON "table_meta" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "view_order_idx" ON "view" USING btree ("order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "account_provider_provider_id_key" ON "account" USING btree ("provider","provider_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "field_lookup_linked_field_id_idx" ON "field" USING btree ("lookup_linked_field_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "pin_resource_created_by_resource_id_key" ON "pin_resource" USING btree ("created_by","resource_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pin_resource_order_idx" ON "pin_resource" USING btree ("order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "oauth_app_client_id_key" ON "oauth_app" USING btree ("client_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "oauth_app_authorized_client_id_user_id_key" ON "oauth_app_authorized" USING btree ("client_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "oauth_app_secret_secret_key" ON "oauth_app_secret" USING btree ("secret");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "oauth_app_token_refresh_token_sign_key" ON "oauth_app_token" USING btree ("refresh_token_sign");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_phone_key" ON "users" USING btree ("phone");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "record_history_table_id_created_time_idx" ON "record_history" USING btree ("table_id","created_time");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "record_history_table_id_record_id_created_time_idx" ON "record_history" USING btree ("table_id","record_id","created_time");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "trash_resource_type_resource_id_key" ON "trash" USING btree ("resource_type","resource_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "plugin_secret_key" ON "plugin" USING btree ("secret");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comment_table_id_record_id_idx" ON "comment" USING btree ("table_id","record_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comment_subscription_table_id_record_id_idx" ON "comment_subscription" USING btree ("table_id","record_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "comment_subscription_table_id_record_id_key" ON "comment_subscription" USING btree ("table_id","record_id");
*/