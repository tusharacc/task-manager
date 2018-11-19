import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskStructure } from 'src/task.interface';

@Injectable({
  providedIn: 'root'
})
export class FetchTasksService {
  tasksList: Array <TaskStructure>
  url: string = 'http://localhost:3000/api/tasks'
  constructor(private http: HttpClient) { }

  fetchTasks(){
    return this.http.get<TaskStructure>(this.url);
  }



}
