import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskPriority } from './task-priority.enum';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');

    query.andWhere({user})

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
// 7eb5ed16-784e-4145-9c3c-1b802d4c26a8
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description, taskPriority } = createTaskDto;
    const task = this.create({
      description,
      title,
      status: TaskStatus.OPEN,
      taskPriority: taskPriority ?? TaskPriority.MEDIUM,
      user
    });

    await this.save(task);
    return task;
  }
}
