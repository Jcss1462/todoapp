import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  tasks = signal<Task[]>([
   {
    id: Date.now(),
    title: "Crear Proyecto",
    completed: true
  },
  {
    id: Date.now(),
    title: "Registrar Producto",
    completed: false
  },
  ]);

 
  deleteTask(index: number){
    //this.tasks.update((task)=>[...task.slice(0, index),...task.slice(index + 1)]);
    this.tasks.update((task)=> task.filter((item,position)=> position != index));
  }

  updateComplete(index: number){
    
    //let taskToUpdate= this.tasks()[index];
    //taskToUpdate.completed =!taskToUpdate.completed;
    this.tasks.update((task)=> task.map((item, i) => 
      index === i ? { ...item, completed: !item.completed } : item
    ));

    console.log(this.tasks());
  }

  //formCtrl
  neweRTaskCtrl = new FormControl('',{
    nonNullable:true,
    validators:[
      Validators.required,
      Validators.minLength(3)
    ]
  })
  
  addTask(title:string)
  {
    let newTask:Task={
      id: Date.now(),
      title: title,
      completed: false
    };
    this.tasks.update((task)=>[...task,newTask]);
    console.log(this.tasks());
  }

  changeHandler(){

    if(this.neweRTaskCtrl.valid){
      const value = this.neweRTaskCtrl.value

      if(value.trim()!==""){
        this.addTask(value);
        this.neweRTaskCtrl.setValue("");
      }
      
    }
   
  }

}
