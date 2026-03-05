import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.taskService.getTask(Number(id));
  }

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body.userId, body.name, body.description);
  }

  @Patch('/:id/done')
  markTaskAsDone(@Param('id') id: string, @Body() body: any) {
    return this.taskService.updateTask(Number(id), { ...body, status: 'done' });
  }

  @Patch('/:id/pending')
  markTaskAsPending(@Param('id') id: string, @Body() body: any) {
    return this.taskService.updateTask(Number(id), { ...body, status: 'pending' });
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(Number(id));
  }
}