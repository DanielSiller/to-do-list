import { tableSchema } from '@nozbe/watermelondb'

export const listSchema = tableSchema({
  name: 'list',
  columns: [
    {
      name: 'name',
      type: 'string'
    },
    {
      name: 'permalink',
      type: 'string'
    },
    {
      name: 'token',
      type: 'string'
    }
  ]
})