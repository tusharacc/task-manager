import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { TaskStructure } from 'src/task.interface';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  tasksList: Array<TaskStructure>;
  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.tasksList = this.taskService.tasksList;
   
  }

}
