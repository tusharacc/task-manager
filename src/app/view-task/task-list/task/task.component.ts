import { Component, OnInit, Input } from '@angular/core';
import { TaskStructure } from 'src/task.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: TaskStructure;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  editTask(task: TaskStructure){
    console.log(task);
    this.router.navigate(['/add-task',JSON.stringify({data:task})],{ skipLocationChange: true });
  }

  completeTask(task: TaskStructure){
    console.log(task);
  }

}
