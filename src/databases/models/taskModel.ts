import { Model } from "@nozbe/watermelondb";
import { field } from '@nozbe/watermelondb/decorators';

export class TaskModel extends Model {
  static table = 'task'

  @field('title')
  title!: string;

  @field('order')
  order!: number;

  @field('listId')
  listId!: string;
}