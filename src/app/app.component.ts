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

  taskStructure: Array<TaskStructure>;
  constructor(private taskService: TasksService){}

  ngOnInit(){
    console.log('I am oninit');
    this.taskService.getTasksList()
      .subscribe((data: Array<TaskStructure>) => {
        this.taskStructure = data;
        this.taskService.tasksList =  this.taskStructure;
        console.log(this.taskStructure);
      });
  }

  title = 'task-manager';
}
