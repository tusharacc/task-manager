import { Component, OnInit, ViewChild } from '@angular/core';
import { TasksService } from 'src/app/tasks.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit {
  taskName = [];
  parentTask = [];
  @ViewChild ('f') searchForm: NgForm;
  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.taskName = this.taskService.getTaskName();
    this.parentTask = this.taskService.getParentTaskName();
    console.log('Component',this.taskName);
  }

  filterTaskList(form:NgForm,filterType:string){
    console.log('filterTaskList',filterType);
    console.log('FilterValue',form['value'][filterType]);
    this.taskService.filterTask(form['value'][filterType],filterType)
    this.searchForm.reset();
  }

}
