import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskStructure, PostTaskStructure } from 'src/task.interface';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from 'rxjs';


@Injectable()
export class TasksService{
    tasksList: Array <TaskStructure> ;
    url: string = 'http://localhost:3000/api/tasks';
    addTaskUrl: string = 'http://localhost:3000/api/posts';
    updateTaskUrl: string = 'http://localhost:3000/api/update';

    constructor (private http: HttpClient){}
    
    getTasksList() {
        console.log('Got called again');
        return this.http.get<Array<TaskStructure>>(this.url);
    }

    addTask(data: PostTaskStructure){
        return this.http.post<PostTaskStructure>(this.addTaskUrl,data);
    }

    updateTask(data: TaskStructure){
        return this.http.post<TaskStructure>(this.updateTaskUrl,data)
    }

    getTaskId(taskName: String){
        for (let i=0; i< this.tasksList.length;i++ ){
            console.log('Inside',typeof this.tasksList[i]['task'],typeof taskName);
            if (this.tasksList[i]['task'] === taskName){
                console.log('I am inside');
                return this.tasksList[i]['_id'];
            }
        }
        return 'Error';
    }
}