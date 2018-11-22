import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TaskStructure, PostTaskStructure } from 'src/task.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  parentTask: Array<String>;
  postTaskStructure: PostTaskStructure;
  taskFromParam: TaskStructure;
  addedTask: Array<TaskStructure>;
  updateTask: TaskStructure;
  update: boolean;
  btnValue: String;
  taskName:String;
  priority:Number;
  parentTaskName:String;
  taskStartDate: Date;
  taskEndDate: Date;
  taskStructure: Array<TaskStructure>;
  show: Boolean;
  
  constructor(private taskService: TasksService,private dataRoute: ActivatedRoute) {
    this.show = false;
    this.postTaskStructure = {};
    let update: boolean;
    this.updateTask = {};
    if (Object.keys(dataRoute.snapshot.params).length != 0){
      this.taskFromParam = JSON.parse(dataRoute.snapshot.params['data']);
    }
  
    if (this.taskFromParam != null){
      this.update = true;
      this.btnValue = "UPDATE TASK"
    } else {
      this.btnValue = "ADD TASK"
    }
    console.log('INput',this.taskFromParam)
  }

  ngOnInit() {

    this.parentTask = [];
    this.taskService.tasksList.forEach((elem) => {
      if (elem['task'] != ''){
        this.parentTask.push(elem['task']);
      }
    });
    this.parentTask.push('PARENT TASK');
    if (this.update){
      this.taskName = this.taskFromParam['data']['task'];
      this.priority = this.taskFromParam['data']['priority'];
      this.parentTaskName = this.taskFromParam['data']['parentTask'] == "" ? 'PARENT TASK': this.taskFromParam['data']['parentTask'];
      let startDt:Date = new Date(this.taskFromParam['data']['startDate']);
      console.log('Getting Date', new Date(startDt.getFullYear(),startDt.getMonth(),startDt.getDate()));
      this.taskStartDate = new Date(startDt.getFullYear(),startDt.getMonth(),startDt.getDate())
      let endDt:Date = new Date(this.taskFromParam['data']['endDate']);
      this.taskEndDate = new Date(endDt.getFullYear(),endDt.getMonth(),endDt.getDate())
    }
  }

  onSubmit(form: NgForm){
    console.log(this.update);
    if (!this.update){
      this.postTaskStructure['task'] = form['value']['taskName'];
      if (form['value']['parentTaskName'] == 'PARENT TASK'){
        this.postTaskStructure['parentTask'] = '';
      } else {
        this.postTaskStructure['parentTask'] = form['value']['parentTaskName'];
      }
      this.postTaskStructure['startDate'] = form['value']['taskStartDate'];
      this.postTaskStructure['endDate'] = form['value']['taskEndDate'];
      this.postTaskStructure['complete'] = false;
      this.postTaskStructure['priority'] = form['value']['priority'];
      this.taskService.addTask(this.postTaskStructure)
      .subscribe(() => {
        console.log('posted');
        this.callServiceAgain();
        this.show = true;
        
      });
    } else {
      console.log(form);
/*       let id = this.taskService.getTaskId(form['value']['taskName']);
      this.updateTask['taskId'] = id;
      this.updateTask['task'] = form['value']['taskName'];
      this.updateTask['parentTask'] = form['value']['parentTaskName'];
      this.updateTask['startDate'] = form['value']['taskStartDate'];
      this.updateTask['endDate'] = form['value']['taskEndDate'];
      this.updateTask['priority'] = form['value']['priority']
      this.taskService.updateTask(this.updateTask)
      .subscribe(() => {
        console.log('Posted');
        this.callServiceAgain();
      }); */
    }
    
  }

  callServiceAgain(){
    this.taskService.getTasksList()
      .subscribe((data: Array<TaskStructure>) => {
      this.taskStructure = data;
      this.taskService.tasksList =  this.taskStructure;
      console.log(this.taskStructure);
    });
  }
}
