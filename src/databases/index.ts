import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { schemas } from "./schemas";
import { ListModel } from "./models/listModel";
import { TaskModel } from "./models/taskModel";
import { SubTaskModel } from "./models/subTaskModel";

const adapter = new SQLiteAdapter({
  schema: schemas
})

export const database = new Database({
  adapter,
  modelClasses: [
    ListModel,
    TaskModel,
    SubTaskModel
  ]
})