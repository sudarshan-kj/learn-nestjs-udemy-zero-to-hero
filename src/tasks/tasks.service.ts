import { Injectable } from '@nestjs/common';

/* Note: making any component Injectable converts it into a Singleton
Hence, the TasksService component here one such */
@Injectable()
export class TasksService {}
