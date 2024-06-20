import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../../services/todo.service";
import {ActivatedRoute} from "@angular/router";
import {ITodoDAO} from "../../../models/ITodoDAO";
import {JsonPipe, NgForOf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatList, MatListItem} from "@angular/material/list";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {STATE} from "../../../enums/State";
import {TYPE} from "../../../enums/Type";
import {TodoDetailTextComponent} from "./todo-detail-text/todo-detail-text.component";
import {TodoDetailMailComponent} from "./todo-detail-mail/todo-detail-mail.component";
import {TodoDetailLinkComponent} from "./todo-detail-link/todo-detail-link.component";

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [
    JsonPipe,
    MatDivider,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatList,
    MatListItem,
    MatOption,
    MatSelect,
    NgForOf,
    TodoDetailTextComponent,
    TodoDetailMailComponent,
    TodoDetailLinkComponent
  ],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent implements OnInit{

  private todoId!: number;
  public todo!: ITodoDAO;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.todoId = parseInt(params['todoId']);
      this.todoService.getTodoById(this.todoId).subscribe( (todo: ITodoDAO) => {
        this.todo = todo;
      });
    })
  }

  protected readonly STATE = STATE;
  protected readonly TYPE = TYPE;
}
