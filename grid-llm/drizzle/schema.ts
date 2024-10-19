import { pgTable, varchar, timestamp, text, integer, index, uniqueIndex, boolean, foreignKey, doublePrecision } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).primaryKey().notNull(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const ops = pgTable("ops", {
	collection: text().notNull(),
	docId: text("doc_id").notNull(),
	docType: text("doc_type").notNull(),
	version: integer().notNull(),
	operation: text().notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text("created_by").notNull(),
},
(table) => {
	return {
		collectionCreatedTimeIdx: index("ops_collection_created_time_idx").using("btree", table.collection.asc().nullsLast(), table.createdTime.asc().nullsLast()),
		collectionDocIdVersionKey: uniqueIndex("ops_collection_doc_id_version_key").using("btree", table.collection.asc().nullsLast(), table.docId.asc().nullsLast(), table.version.asc().nullsLast()),
	}
});

export const snapshots = pgTable("snapshots", {
	collection: text().notNull(),
	docId: text("doc_id").notNull(),
	docType: text("doc_type").notNull(),
	version: integer().notNull(),
	data: text().notNull(),
},
(table) => {
	return {
		collectionDocIdKey: uniqueIndex("snapshots_collection_doc_id_key").using("btree", table.collection.asc().nullsLast(), table.docId.asc().nullsLast()),
	}
});

export const reference = pgTable("reference", {
	id: text().primaryKey().notNull(),
	fromFieldId: text("from_field_id").notNull(),
	toFieldId: text("to_field_id").notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		fromFieldIdIdx: index("reference_from_field_id_idx").using("btree", table.fromFieldId.asc().nullsLast()),
		toFieldIdFromFieldIdKey: uniqueIndex("reference_to_field_id_from_field_id_key").using("btree", table.toFieldId.asc().nullsLast(), table.fromFieldId.asc().nullsLast()),
		toFieldIdIdx: index("reference_to_field_id_idx").using("btree", table.toFieldId.asc().nullsLast()),
	}
});

export const attachments = pgTable("attachments", {
	id: text().primaryKey().notNull(),
	token: text().notNull(),
	hash: text().notNull(),
	size: integer().notNull(),
	mimetype: text().notNull(),
	path: text().notNull(),
	width: integer(),
	height: integer(),
	deletedTime: timestamp("deleted_time", { precision: 3, mode: 'string' }),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text("created_by").notNull(),
	lastModifiedBy: text("last_modified_by"),
},
(table) => {
	return {
		tokenKey: uniqueIndex("attachments_token_key").using("btree", table.token.asc().nullsLast()),
	}
});

export const attachmentsTable = pgTable("attachments_table", {
	id: text().primaryKey().notNull(),
	attachmentId: text("attachment_id").notNull(),
	name: text().notNull(),
	token: text().notNull(),
	tableId: text("table_id").notNull(),
	recordId: text("record_id").notNull(),
	fieldId: text("field_id").notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text("created_by").notNull(),
	lastModifiedBy: text("last_modified_by"),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
});

export const notification = pgTable("notification", {
	id: text().primaryKey().notNull(),
	fromUserId: text("from_user_id").notNull(),
	toUserId: text("to_user_id").notNull(),
	type: text().notNull(),
	message: text().notNull(),
	isRead: boolean("is_read").default(false).notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text("created_by").notNull(),
	urlPath: text("url_path"),
},
(table) => {
	return {
		toUserIdIsReadCreatedTimeIdx: index("notification_to_user_id_is_read_created_time_idx").using("btree", table.toUserId.asc().nullsLast(), table.isRead.asc().nullsLast(), table.createdTime.asc().nullsLast()),
	}
});

export const invitation = pgTable("invitation", {
	id: text().primaryKey().notNull(),
	baseId: text("base_id"),
	spaceId: text("space_id"),
	type: text().notNull(),
	role: text().notNull(),
	invitationCode: text("invitation_code").notNull(),
	expiredTime: timestamp("expired_time", { precision: 3, mode: 'string' }),
	createBy: text("create_by").notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
	lastModifiedBy: text("last_modified_by"),
	deletedTime: timestamp("deleted_time", { precision: 3, mode: 'string' }),
});

export const invitationRecord = pgTable("invitation_record", {
	id: text().primaryKey().notNull(),
	invitationId: text("invitation_id").notNull(),
	baseId: text("base_id"),
	spaceId: text("space_id"),
	type: text().notNull(),
	inviter: text().notNull(),
	accepter: text().notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const accessToken = pgTable("access_token", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	userId: text("user_id").notNull(),
	scopes: text().notNull(),
	spaceIds: text("space_ids"),
	baseIds: text("base_ids"),
	sign: text().notNull(),
	expiredTime: timestamp("expired_time", { precision: 3, mode: 'string' }).notNull(),
	lastUsedTime: timestamp("last_used_time", { precision: 3, mode: 'string' }),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
	clientId: text("client_id"),
});

export const collaborator = pgTable("collaborator", {
	id: text().primaryKey().notNull(),
	roleName: text("role_name").notNull(),
	userId: text("user_id").notNull(),
	createdBy: text("created_by").notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
	lastModifiedBy: text("last_modified_by"),
	resourceId: text("resource_id").notNull(),
	resourceType: text("resource_type").notNull(),
},
(table) => {
	return {
		resourceTypeResourceIdUserIdKey: uniqueIndex("collaborator_resource_type_resource_id_user_id_key").using("btree", table.resourceType.asc().nullsLast(), table.resourceId.asc().nullsLast(), table.userId.asc().nullsLast()),
		collaboratorUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "collaborator_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const base = pgTable("base", {
	id: text().primaryKey().notNull(),
	spaceId: text("space_id").notNull(),
	name: text().notNull(),
	order: doublePrecision().notNull(),
	icon: text(),
	schemaPass: text("schema_pass"),
	deletedTime: timestamp("deleted_time", { precision: 3, mode: 'string' }),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text("created_by").notNull(),
	lastModifiedBy: text("last_modified_by"),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
},
(table) => {
	return {
		orderIdx: index("base_order_idx").using("btree", table.order.asc().nullsLast()),
		baseSpaceIdFkey: foreignKey({
			columns: [table.spaceId],
			foreignColumns: [space.id],
			name: "base_space_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const tableMeta = pgTable("table_meta", {
	id: text().primaryKey().notNull(),
	baseId: text("base_id").notNull(),
	name: text().notNull(),
	description: text(),
	icon: text(),
	dbTableName: text("db_table_name").notNull(),
	version: integer().notNull(),
	order: doublePrecision().notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
	deletedTime: timestamp("deleted_time", { precision: 3, mode: 'string' }),
	createdBy: text("created_by").notNull(),
	lastModifiedBy: text("last_modified_by"),
},
(table) => {
	return {
		orderIdx: index("table_meta_order_idx").using("btree", table.order.asc().nullsLast()),
		tableMetaBaseIdFkey: foreignKey({
			columns: [table.baseId],
			foreignColumns: [base.id],
			name: "table_meta_base_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const view = pgTable("view", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	tableId: text("table_id").notNull(),
	type: text().notNull(),
	sort: text(),
	filter: text(),
	group: text(),
	options: text(),
	order: doublePrecision().notNull(),
	version: integer().notNull(),
	columnMeta: text("column_meta").notNull(),
	enableShare: boolean("enable_share"),
	shareId: text("share_id"),
	shareMeta: text("share_meta"),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
	deletedTime: timestamp("deleted_time", { precision: 3, mode: 'string' }),
	createdBy: text("created_by").notNull(),
	lastModifiedBy: text("last_modified_by"),
},
(table) => {
	return {
		orderIdx: index("view_order_idx").using("btree", table.order.asc().nullsLast()),
		viewTableIdFkey: foreignKey({
			columns: [table.tableId],
			foreignColumns: [tableMeta.id],
			name: "view_table_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerId: text("provider_id").notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		providerProviderIdKey: uniqueIndex("account_provider_provider_id_key").using("btree", table.provider.asc().nullsLast(), table.providerId.asc().nullsLast()),
		accountUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "account_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const space = pgTable("space", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	deletedTime: timestamp("deleted_time", { precision: 3, mode: 'string' }),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text("created_by").notNull(),
	lastModifiedBy: text("last_modified_by"),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
	credit: integer(),
});

export const field = pgTable("field", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	options: text(),
	type: text().notNull(),
	cellValueType: text("cell_value_type").notNull(),
	isMultipleCellValue: boolean("is_multiple_cell_value"),
	dbFieldType: text("db_field_type").notNull(),
	dbFieldName: text("db_field_name").notNull(),
	notNull: boolean("not_null"),
	unique: boolean(),
	isPrimary: boolean("is_primary"),
	isComputed: boolean("is_computed"),
	isLookup: boolean("is_lookup"),
	isPending: boolean("is_pending"),
	hasError: boolean("has_error"),
	lookupLinkedFieldId: text("lookup_linked_field_id"),
	lookupOptions: text("lookup_options"),
	tableId: text("table_id").notNull(),
	version: integer().notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
	deletedTime: timestamp("deleted_time", { precision: 3, mode: 'string' }),
	createdBy: text("created_by").notNull(),
	lastModifiedBy: text("last_modified_by"),
	order: doublePrecision().notNull(),
},
(table) => {
	return {
		lookupLinkedFieldIdIdx: index("field_lookup_linked_field_id_idx").using("btree", table.lookupLinkedFieldId.asc().nullsLast()),
		fieldTableIdFkey: foreignKey({
			columns: [table.tableId],
			foreignColumns: [tableMeta.id],
			name: "field_table_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const pinResource = pgTable("pin_resource", {
	id: text().primaryKey().notNull(),
	type: text().notNull(),
	resourceId: text("resource_id").notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text("created_by").notNull(),
	order: doublePrecision().notNull(),
},
(table) => {
	return {
		createdByResourceIdKey: uniqueIndex("pin_resource_created_by_resource_id_key").using("btree", table.createdBy.asc().nullsLast(), table.resourceId.asc().nullsLast()),
		orderIdx: index("pin_resource_order_idx").using("btree", table.order.asc().nullsLast()),
	}
});

export const oauthApp = pgTable("oauth_app", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	logo: text(),
	homepage: text().notNull(),
	description: text(),
	clientId: text("client_id").notNull(),
	redirectUris: text("redirect_uris"),
	scopes: text(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
	createdBy: text("created_by").notNull(),
},
(table) => {
	return {
		clientIdKey: uniqueIndex("oauth_app_client_id_key").using("btree", table.clientId.asc().nullsLast()),
	}
});

export const setting = pgTable("setting", {
	instanceId: text("instance_id").primaryKey().notNull(),
	disallowSignUp: boolean("disallow_sign_up"),
	disallowSpaceCreation: boolean("disallow_space_creation"),
	disallowSpaceInvitation: boolean("disallow_space_invitation"),
});

export const oauthAppAuthorized = pgTable("oauth_app_authorized", {
	id: text().primaryKey().notNull(),
	clientId: text("client_id").notNull(),
	userId: text("user_id").notNull(),
	authorizedTime: timestamp("authorized_time", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		clientIdUserIdKey: uniqueIndex("oauth_app_authorized_client_id_user_id_key").using("btree", table.clientId.asc().nullsLast(), table.userId.asc().nullsLast()),
	}
});

export const oauthAppSecret = pgTable("oauth_app_secret", {
	id: text().primaryKey().notNull(),
	clientId: text("client_id").notNull(),
	secret: text().notNull(),
	maskedSecret: text("masked_secret").notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text("created_by").notNull(),
	lastUsedTime: timestamp("last_used_time", { precision: 3, mode: 'string' }),
},
(table) => {
	return {
		secretKey: uniqueIndex("oauth_app_secret_secret_key").using("btree", table.secret.asc().nullsLast()),
	}
});

export const oauthAppToken = pgTable("oauth_app_token", {
	id: text().primaryKey().notNull(),
	appSecretId: text("app_secret_id").notNull(),
	refreshTokenSign: text("refresh_token_sign").notNull(),
	expiredTime: timestamp("expired_time", { precision: 3, mode: 'string' }).notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text("created_by").notNull(),
},
(table) => {
	return {
		refreshTokenSignKey: uniqueIndex("oauth_app_token_refresh_token_sign_key").using("btree", table.refreshTokenSign.asc().nullsLast()),
	}
});

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	password: text(),
	salt: text(),
	phone: text(),
	email: text().notNull(),
	avatar: text(),
	notifyMeta: text("notify_meta"),
	lastSignTime: timestamp("last_sign_time", { precision: 3, mode: 'string' }),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	deletedTime: timestamp("deleted_time", { precision: 3, mode: 'string' }),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
	deactivatedTime: timestamp("deactivated_time", { precision: 3, mode: 'string' }),
	isAdmin: boolean("is_admin"),
	isSystem: boolean("is_system"),
},
(table) => {
	return {
		emailKey: uniqueIndex("users_email_key").using("btree", table.email.asc().nullsLast()),
		phoneKey: uniqueIndex("users_phone_key").using("btree", table.phone.asc().nullsLast()),
	}
});

export const recordHistory = pgTable("record_history", {
	id: text().primaryKey().notNull(),
	tableId: text("table_id").notNull(),
	recordId: text("record_id").notNull(),
	fieldId: text("field_id").notNull(),
	before: text().notNull(),
	after: text().notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text("created_by").notNull(),
},
(table) => {
	return {
		tableIdCreatedTimeIdx: index("record_history_table_id_created_time_idx").using("btree", table.tableId.asc().nullsLast(), table.createdTime.asc().nullsLast()),
		tableIdRecordIdCreatedTimeIdx: index("record_history_table_id_record_id_created_time_idx").using("btree", table.tableId.asc().nullsLast(), table.recordId.asc().nullsLast(), table.createdTime.asc().nullsLast()),
	}
});

export const trash = pgTable("trash", {
	id: text().primaryKey().notNull(),
	resourceType: text("resource_type").notNull(),
	resourceId: text("resource_id").notNull(),
	parentId: text("parent_id"),
	deletedTime: timestamp("deleted_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	deletedBy: text("deleted_by").notNull(),
},
(table) => {
	return {
		resourceTypeResourceIdKey: uniqueIndex("trash_resource_type_resource_id_key").using("btree", table.resourceType.asc().nullsLast(), table.resourceId.asc().nullsLast()),
	}
});

export const dashboard = pgTable("dashboard", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	baseId: text("base_id").notNull(),
	layout: text(),
	createdBy: text("created_by").notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
	lastModifiedBy: text("last_modified_by"),
});

export const plugin = pgTable("plugin", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	detailDesc: text("detail_desc"),
	logo: text().notNull(),
	helpUrl: text("help_url"),
	status: text().notNull(),
	positions: text().notNull(),
	url: text(),
	secret: text().notNull(),
	maskedSecret: text("masked_secret").notNull(),
	i18N: text(),
	pluginUser: text("plugin_user"),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
	createdBy: text("created_by").notNull(),
	lastModifiedBy: text("last_modified_by"),
},
(table) => {
	return {
		secretKey: uniqueIndex("plugin_secret_key").using("btree", table.secret.asc().nullsLast()),
	}
});

export const pluginInstall = pgTable("plugin_install", {
	id: text().primaryKey().notNull(),
	pluginId: text("plugin_id").notNull(),
	baseId: text("base_id").notNull(),
	name: text().notNull(),
	positionId: text("position_id").notNull(),
	position: text().notNull(),
	storage: text(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text("created_by").notNull(),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
	lastModifiedBy: text("last_modified_by"),
},
(table) => {
	return {
		pluginInstallPluginIdFkey: foreignKey({
			columns: [table.pluginId],
			foreignColumns: [plugin.id],
			name: "plugin_install_plugin_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const comment = pgTable("comment", {
	id: text().primaryKey().notNull(),
	tableId: text("table_id").notNull(),
	recordId: text("record_id").notNull(),
	quoteId: text("quote_Id"),
	content: text(),
	reaction: text(),
	deletedTime: timestamp("deleted_time", { precision: 3, mode: 'string' }),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text("created_by").notNull(),
	lastModifiedTime: timestamp("last_modified_time", { precision: 3, mode: 'string' }),
},
(table) => {
	return {
		tableIdRecordIdIdx: index("comment_table_id_record_id_idx").using("btree", table.tableId.asc().nullsLast(), table.recordId.asc().nullsLast()),
	}
});

export const commentSubscription = pgTable("comment_subscription", {
	tableId: text("table_id").notNull(),
	recordId: text("record_id").notNull(),
	createdBy: text("created_by").notNull(),
	createdTime: timestamp("created_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		tableIdRecordIdIdx: index("comment_subscription_table_id_record_id_idx").using("btree", table.tableId.asc().nullsLast(), table.recordId.asc().nullsLast()),
		tableIdRecordIdKey: uniqueIndex("comment_subscription_table_id_record_id_key").using("btree", table.tableId.asc().nullsLast(), table.recordId.asc().nullsLast()),
	}
});
