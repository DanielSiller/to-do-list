import { Model } from "@nozbe/watermelondb";
import { field } from '@nozbe/watermelondb/decorators';

export class ListModel extends Model {
  static table = 'list'

  @field('name')
  name!: string;

  @field('permalink')
  permalink!: string;

  @field('token')
  token!: string;
}