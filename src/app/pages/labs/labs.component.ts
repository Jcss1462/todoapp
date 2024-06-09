import { Component, signal } from '@angular/core';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {

  title = 'todoapp';
  welcome ="Holiwis"
  //heroes = ["Ironman","Cap","Thor","Hulk","Black widow","Hawk eye"];
  heroes = signal (["Ironman","Cap","Thor","Hulk","Black widow","Hawk eye"]);
  private secreto ="33"
  usuario =signal({
    Nombre:"Juan Camilo",
    Apellido:"Salazar Serna"
  });
  
  calculo(){
    console.log(1+3);
    return 1+3;
  }

  imgSrc="https://rtvc-assets-radionica3.s3.amazonaws.com/s3fs-public/styles/1200x630/public/2024-05/The_Acolyte.webp?itok=Qzj3rkbT";

  changeHandler(event:Event){
    console.log(event);
  }

  keyupHandler(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  //signals
  signalvar = signal("holi");
  changeSignal(event:Event){
    const input = event.target as HTMLInputElement;
    const newvalue = input.value;
    this.signalvar.set(newvalue);
    console.log(event);
  }


  //formCtrl

  colorCtrl = new FormControl();

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    });

  }

  widthCtrl = new FormControl(50,{
    nonNullable:true
  });

  nameCtrl = new FormControl("Perez",{
    nonNullable:true,
    validators:[
      Validators.required,
      Validators.minLength(3)
    ]
  });




}
