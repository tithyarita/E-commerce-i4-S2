import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../tasks/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}
  
  
createTask(userId: number, name: string, description?: string) {
  const task = this.tasksRepo.create({
    name,                // use `name` instead of `title`
    description,
    user: { id: userId },
  } as Partial<Task>);   // cast to Partial<Task> to satisfy TypeScript
  return this.tasksRepo.save(task);
}
   getAllTasks() {
    return this.tasksRepo.find({ relations: ['user'] });
  }
  
  findAll() {
    return this.tasksRepo.find({ relations: ['user'] });
  }
 
  getTask(id: number) {
    return this.tasksRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async updateTask(id: number, updateData: Partial<Task>) {
    await this.tasksRepo.update(id, updateData);
    return this.getTask(id);
  }

  deleteTask(id: number) {
    return this.tasksRepo.delete(id);
  }

  findByUser(userId: number) {
    return this.tasksRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}