import { Component,OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { TaskStructure } from 'src/task.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TasksService]
})
export class AppComponent implements OnInit {

  tasksList: Array<TaskStructure>;
  constructor(private taskService: TasksService){}

  ngOnInit(){
    this.taskService.getTasksList()
      .subscribe((data: Array<TaskStructure>) => {
        this.tasksList = data['data'];
        this.taskService.tasksList =  this.tasksList;
        console.log('Fetched tasks',this.tasksList);
      });
  }

  title = 'task-manager';
}
