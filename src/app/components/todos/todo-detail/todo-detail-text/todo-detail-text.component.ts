import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-todo-detail-text',
  imports: [],
  templateUrl: './todo-detail-text.component.html',
  standalone: true,
  styleUrl: './todo-detail-text.component.scss'
})
export class TodoDetailTextComponent {

  @Input()
  textContent!: string[]

}
