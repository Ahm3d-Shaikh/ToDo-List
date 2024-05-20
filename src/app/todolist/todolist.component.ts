import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

interface Task {
  id: number,
  taskName: string,
  isCompleted: boolean
};

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent implements OnInit{

  //Array to store the tasks
  taskArr: Task[] = [];
  //Flag to handle edit modal
  isEditModalOpen = false;
  //Current task being edited
  currentTask: Task = {id: 0, taskName: '', isCompleted: false};
  //Index of the current task
  currentTaskIndex : number = -1;

  //Inject http client for making requests
  constructor(private http: HttpClient) { }

  //Lifecycle hook that gets called after the component has initialized
  ngOnInit(): void {
    this.fetchTasks();
  }

  //Fetch all tasks from the server
  fetchTasks() {
    this.http.get<Task[]>('/api/v1/tasks').subscribe(tasks => {
      this.taskArr = tasks;
    });
  };
  
  //Handler to add a new task
  onSubmitHandler(form: NgForm) {
    const task = form.controls['task'].value;
    this.http.post('/api/v1/tasks', {taskName: task, isCompleted: false}).subscribe((newTask: any) => {
      
      this.taskArr.push(newTask);
      form.reset();
    })
    // this.taskArr.push({
    //   taskName: form.controls['task'].value,
    //   isCompleted: false
    // })

    // form.reset();
  };

  //Handler to delete a task by index
  onDelete(idx: number) {
    const taskId = this.taskArr[idx].id;
    this.http.delete(`/api/v1/tasks/${taskId}`).subscribe(() => {
      this.taskArr.splice(idx, 1);
    })
    // this.taskArr.splice(idx, 1);
  }

  //Handler to open the edit modal for a task
  onEdit(task: any, idx: number) {
    this.currentTask = {...task};
    this.currentTaskIndex = idx;
    this.isEditModalOpen = true;
  }

  //Handler for form submission to update an existing task
  onEditSubmit(form : NgForm) {
    const updatedTask = form.controls['task'].value;
    const taskId = this.currentTask.id;

    this.http.put(`/api/v1/tasks/${taskId}`, {taskName: updatedTask, isCompleted: this.currentTask.isCompleted}).subscribe(() => {
      this.taskArr[this.currentTaskIndex].taskName = updatedTask;
      this.isEditModalOpen = false;
    });
  };

  //Handler to toggle the completion status of a task
  onCheck(idx: number) {
    const task = this.taskArr[idx];
    const updatedTask = {...task, isCompleted: !task.isCompleted};

    this.http.put(`/api/v1/tasks/${task.id}`, updatedTask).subscribe(() => {
      this.taskArr[idx].isCompleted = !this.taskArr[idx].isCompleted;

    })
  }
}
