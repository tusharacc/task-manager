import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskStructure, PostTaskStructure } from 'src/task.interface';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable, Subject, BehaviorSubject } from 'rxjs';


@Injectable()
export class TasksService{
    private taskName = new BehaviorSubject<string>('');
    searchType:string;
    tasksList: Array <TaskStructure> ;
    url: string = 'http://localhost:3000/api/tasks';
    addTaskUrl: string = 'http://localhost:3000/api/posts';
    updateTaskUrl: string = 'http://localhost:3000/api/update';

    //url: string = 'http://localhost:3000/api/tasks';
    //addTaskUrl: string = 'http://localhost:3000/api/posts';
    //updateTaskUrl: string = 'http://localhost:3000/api/update';

    taskItem$ = this.taskName.asObservable();
    constructor (private http: HttpClient){}
    
    getTasksList() {
        console.log('Got called again');
        return this.http.get<Array<TaskStructure>>(this.url);
    }

    addTask(data: PostTaskStructure){
        return this.http.post<PostTaskStructure>(this.addTaskUrl,data);
    }

    updateTask(data: {'id': String,'update':{}}){
        console.log('Updating ',data)
        return this.http.post(this.updateTaskUrl,data)
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

    getTaskName(){
        let taskName = [];
        console.log('TasksList in Service',this.tasksList);
        this.tasksList.forEach((elem) => {
            taskName.push(elem['task'])
        });
        console.log('TaskName in Service',taskName);
        return taskName;
    }

    getParentTaskName(){
        let parentTask = [];
        this.tasksList.forEach((elem) => {
            parentTask.push(elem['parentTask'])
        });
        console.log(parentTask);
        return parentTask;
    }

    filterTask(task: string,type: string){
        this.searchType = type;
        this.taskName.next(task);
        
        console.log('Defining searchType',this.searchType);
    }
}
