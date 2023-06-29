import { tableSchema } from '@nozbe/watermelondb'

export const subTaskSchema = tableSchema({
  name: 'sub_task',
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
      name: 'taskId',
      type: 'string'
    }
  ]
})