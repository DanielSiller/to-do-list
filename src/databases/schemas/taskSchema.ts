import { tableSchema } from '@nozbe/watermelondb'

export const taskSchema = tableSchema({
  name: 'task',
  columns: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'order',
      type: 'number'
    },
    {
      name: 'listId',
      type: 'string'
    }
  ]
})