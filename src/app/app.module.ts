import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { SearchTaskComponent } from './view-task/search-task/search-task.component';
import { TaskListComponent } from './view-task/task-list/task-list.component';
import { TaskComponent } from './view-task/task-list/task/task.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path:'',component: HomeComponent},
  { path:'add-task', component: AddTaskComponent },
  { path:'add-task/:data', component: AddTaskComponent }, 
  { path:'view-task', component: ViewTaskComponent } 
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddTaskComponent,
    ViewTaskComponent,
    SearchTaskComponent,
    TaskListComponent,
    TaskComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
