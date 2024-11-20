import { sqliteTableCreator, index, int, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator(
  (name) => `mantenimiento_${name}`,
);

export const equipos = createTable(
  "equipos",
  {
    id: int("id").primaryKey().notNull(),
    name: text("name", { length: 256 }),
    createdAt: int("created_at"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
