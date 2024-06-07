import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {

  title = 'todoapp';
  welcome ="Holiwis"
  heroes = ["Ironman","Cap","Thor","Hulk","Black widow","Hawk eye"];

}
