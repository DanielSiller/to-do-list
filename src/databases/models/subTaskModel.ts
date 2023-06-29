import { Model } from "@nozbe/watermelondb";
import { field } from '@nozbe/watermelondb/decorators';

export class SubTaskModel extends Model {
  static table = 'sub_task'

  @field('title')
  title!: string;

  @field('order')
  order!: number;

  @field('taskId')
  taskId!: string;
}