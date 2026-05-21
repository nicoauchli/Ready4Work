import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-todo-detail-link',
  imports: [],
  templateUrl: './todo-detail-link.component.html',
  standalone: true,
  styleUrl: './todo-detail-link.component.scss'
})
export class TodoDetailLinkComponent {

  @Input()
  linkContent!: string[]


}
