import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-todo-detail-text',
  standalone: true,
  imports: [],
  templateUrl: './todo-detail-text.component.html',
  styleUrl: './todo-detail-text.component.scss'
})
export class TodoDetailTextComponent {

  @Input()
  textContent!: string[]

}
