import { IsNotEmpty } from 'class-validator';
import { TaskPriority } from '../task-priority.enum';
import { Optional } from '@nestjs/common';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @Optional()
  taskPriority: TaskPriority;
}
