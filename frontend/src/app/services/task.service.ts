import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task.model';
import { TaskApi } from '../models/TaskApi.model';
import { TaskComment } from '../models/task-comment.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskApi> {
    const res =  this.http.get<TaskApi>(this.apiUrl);
    return res;
  }

  getTask(taskId: number): Observable<Task> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.get<Task>(url);
  }

  deleteTask(task: Task): Observable<Task> {
    
    const url = `${this.apiUrl}/${task.task_id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.task_id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }

  getTaskComments(taskId: string): Observable<TaskComment[]> {
    const url = `${this.apiUrl}/${taskId}/comments`;
    return this.http.get<TaskComment[]>(url);
  }

  addTaskComment(comment: string, taskId: string): Observable<TaskComment> {
    const taskComment: TaskComment = {
      id: null,
      taskId: taskId,
      body: comment,
      createdAt: new Date()
    };
    const url = `${this.apiUrl}/${taskId}/comments`
    return this.http.post<TaskComment>(url, taskComment);
  }


  filterTasks(status: string, priority: string, deadline: string): Observable<Task[]> {
    let params = {};
    if (status) {
      params = {...params, completed: (status === 'completed').toString()};
    }
    if (priority) {
      params = {...params, priority};
    }
    if (deadline) {
      params = {...params, due_date: deadline};
    }
    return this.http.get<Task[]>(this.apiUrl, {params});
  }

}
