import { Component, Inject, Injector, computed, effect, inject, signal } from '@angular/core';
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

  tasks = signal<Task[]>([ ]);

 
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
      const value = this.neweRTaskCtrl.value.trim();

      if(value!==""){
        this.addTask(value);
        this.neweRTaskCtrl.setValue("");
      }
      
    }
  }


  editTaskCtrl = new FormControl('',{
    nonNullable:true,
    validators:[
      Validators.required,
      Validators.minLength(3)
    ]
  })

  updateTaskEditingMode(index:number){

    this.tasks.update((task)=> task.map((item, i) => 
      index === i ? { ...item, editing: true} : {...item, editing:false}
    ));

    let originalItem =this.tasks().filter((item,position)=> position === index?item:"")[0];
    this.editTaskCtrl.setValue(originalItem.title);

  }

  saveEdit(index:number){

    this.tasks.update((task)=> task.map((item, i) => 
      index === i ? { ...item, editing: false , title: this.editTaskCtrl.value.trim()}:item 
    ));
    this.editTaskCtrl.setValue("");
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //estados compuestos
  filter = signal<"all" | "pending" | "completed">("all");
  taskByFilter = computed(()=>{

    console.log("run computed");
    const filter = this.filter();
    const tasks = this.tasks()
    
    if(filter ==="pending"){
      return tasks.filter(task => !task.completed);
    }

    if(filter ==="completed"){
      return tasks.filter(task => task.completed);
    }

    return tasks;


  });

  chnageFilter(filter: "all" | "pending" | "completed"){

    this.filter.set(filter);

  }

  injector =inject(Injector);

  trackEffect(){
    effect(()=>{
      const tasks = this.tasks();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },{injector:this.injector});
  }
  ngOnInit(){

    const storage=localStorage.getItem("tasks")

    if(storage){
      const tasks= JSON.parse(storage);
      this.tasks.set(tasks);
    }
  
    this.trackEffect();
  }

}
