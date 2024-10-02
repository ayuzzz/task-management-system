import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MiniatureTask, Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = 'https://localhost:5001';

  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  GetMiniatureTasks(): Observable<MiniatureTask[]> {
    return this.httpClient.get<MiniatureTask[]>(
      `${this.baseUrl}/miniature-tasks`
    );
  }

  GetTaskDetails(taskId: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.baseUrl}/tasks/${taskId}`);
  }

  CreateNewTask(task: Task): Observable<number> {
    return this.httpClient.put<number>(`${this.baseUrl}/tasks`, task);
  }

  DeleteTask(taskId: number): Observable<number> {
    return this.httpClient.delete<number>(`${this.baseUrl}/tasks/${taskId}`);
  }
}
