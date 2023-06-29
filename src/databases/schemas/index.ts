import { appSchema } from '@nozbe/watermelondb';

import { listSchema } from './listSchema'
import { taskSchema } from './taskSchema';
import { subTaskSchema } from './subTaskSchema';

export const schemas = appSchema({
  version: 1,
  tables: [
    listSchema,
    taskSchema,
    subTaskSchema
  ]
})