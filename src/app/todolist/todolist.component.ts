import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent implements OnInit{

  taskArr = [{taskName: 'Have BreakFast', isCompleted: false}];
  constructor() { }

  ngOnInit(): void {
    
  }
  
  onSubmitHandler(form: NgForm) {
    this.taskArr.push({
      taskName: form.controls['task'].value,
      isCompleted: false
    })

    form.reset();
  };

  onDelete(idx: number) {
    this.taskArr.splice(idx, 1);
  }

  onCheck(idx: number) {
    this.taskArr[idx].isCompleted = !this.taskArr[idx].isCompleted;
  }
}
