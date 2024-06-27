import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {TodoDetailLinkComponent} from "../../todos/todo-detail/todo-detail-link/todo-detail-link.component";
import {TodoDetailMailComponent} from "../../todos/todo-detail/todo-detail-mail/todo-detail-mail.component";
import {TodoDetailTextComponent} from "../../todos/todo-detail/todo-detail-text/todo-detail-text.component";
import {TodoService} from "../../../services/todo.service";
import {ITodoDAO} from "../../../models/ITodoDAO";
import {ActivatedRoute} from "@angular/router";
import {Mode} from "../../../enums/mode";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-checklist-detail',
  standalone: true,
  imports: [
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    TodoDetailLinkComponent,
    TodoDetailMailComponent,
    TodoDetailTextComponent,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './checklist-detail.component.html',
  styleUrl: './checklist-detail.component.scss'
})
export class ChecklistDetailComponent implements OnInit {

  public todo!: ITodoDAO;
  public todoId!: number;
  public mode: Mode = Mode.VIEW;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.todoId = parseInt(params['todoId']);
      this.todoService.getTodoById(this.todoId).subscribe( (todo: ITodoDAO) => {
        this.todo = todo;
      });
    })
  }

  protected readonly Mode = Mode;

  public changeMode() {
    this.mode = this.mode === Mode.VIEW ? Mode.EDIT : Mode.VIEW;
  }

}
