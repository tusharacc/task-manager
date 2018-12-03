import { Component, OnInit, Input, Output } from '@angular/core';
import { TasksService } from '../tasks.service';
import { TaskStructure } from 'src/task.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  @Input() task: TaskStructure;
  @Output() isDisabled: Boolean;
  tasksList: Array<TaskStructure>;
  subscription:Subscription;
  searchType:string;
  taskStructure: any;
  constructor(private taskService: TasksService,private router: Router) { 
    this.isDisabled = false;
  }

  ngOnInit() {
    this.tasksList = this.taskService.tasksList;
    this.subscription = this.taskService.taskItem$
       .subscribe((item) => {
         if (item === ''){
          this.searchType = 'searchByTaskName'
         } else {
           this.searchType = this.taskService.searchType

         }
          this.tasksList = this.taskService.tasksList.filter((value)=>{
          console.log('Checking value',item,this.searchType);
          switch(this.searchType){
            case 'searchByTaskName':{
              console.log('I am in')
              return value['task'].indexOf(item) >= 0
              break;
            }
            case 'searchByParentTask':{
              return value['parentTask'].indexOf(item) >= 0
              break;
            }
            case 'searchByPriorityFrom':{
              return value['priority'] >= Number(item)
              break;
            }
            case 'searchByPriorityTo':{
              return value['priority'] <= Number(item)
              break;
            }
            case 'searchByStartDate':{
              console.log(item);
              return value
              break;
            }
            case 'searchByEndDate':{
              return value
              break;
            }
          }          
        });
        console.log('TaskList',this.tasksList);
       } )
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  editTask(task: TaskStructure){
    console.log('Get the Task',task);
    this.router.navigate(['/add-task',JSON.stringify({data:task})],{ skipLocationChange: true });
  }

  completeTask(task: TaskStructure){
    let id:String = this.taskService.getTaskId(task['task'])
    let data = {'id':id,'update':{'complete':true}}
    this.taskService.updateTask(data)
      .subscribe((data) => {
        status = data['status']
        if (status === 'Ok'){
          this.taskService.getTasksList()
            .subscribe((data: Array<TaskStructure>) => {
            this.taskStructure = data['data'];
            this.taskService.tasksList =  this.taskStructure;
            console.log(this.taskStructure);
            this.tasksList = this.taskService.tasksList;
          });
        } else {

        }
      });
    //this.taskService.updateTask(data)
  }

}
