import { relations } from "drizzle-orm/relations";
import { users, collaborator, space, base, tableMeta, view, account, field, plugin, pluginInstall } from "./schema";

export const collaboratorRelations = relations(collaborator, ({one}) => ({
	user: one(users, {
		fields: [collaborator.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	collaborators: many(collaborator),
	accounts: many(account),
}));

export const baseRelations = relations(base, ({one, many}) => ({
	space: one(space, {
		fields: [base.spaceId],
		references: [space.id]
	}),
	tableMetas: many(tableMeta),
}));

export const spaceRelations = relations(space, ({many}) => ({
	bases: many(base),
}));

export const tableMetaRelations = relations(tableMeta, ({one, many}) => ({
	base: one(base, {
		fields: [tableMeta.baseId],
		references: [base.id]
	}),
	views: many(view),
	fields: many(field),
}));

export const viewRelations = relations(view, ({one}) => ({
	tableMeta: one(tableMeta, {
		fields: [view.tableId],
		references: [tableMeta.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(users, {
		fields: [account.userId],
		references: [users.id]
	}),
}));

export const fieldRelations = relations(field, ({one}) => ({
	tableMeta: one(tableMeta, {
		fields: [field.tableId],
		references: [tableMeta.id]
	}),
}));

export const pluginInstallRelations = relations(pluginInstall, ({one}) => ({
	plugin: one(plugin, {
		fields: [pluginInstall.pluginId],
		references: [plugin.id]
	}),
}));

export const pluginRelations = relations(plugin, ({many}) => ({
	pluginInstalls: many(pluginInstall),
}));