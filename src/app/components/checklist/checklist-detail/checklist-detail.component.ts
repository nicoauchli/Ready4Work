import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {TodoDetailLinkComponent} from "../../todos/todo-detail/todo-detail-link/todo-detail-link.component";
import {TodoDetailMailComponent} from "../../todos/todo-detail/todo-detail-mail/todo-detail-mail.component";
import {TodoDetailTextComponent} from "../../todos/todo-detail/todo-detail-text/todo-detail-text.component";
import {TodoService} from "../../../services/todo.service";
import {ITodoDAO} from "../../../models/ITodoDAO";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MODE} from "../../../enums/Mode";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import { NgClass } from "@angular/common";
import {TYPE} from "../../../enums/Type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-checklist-detail',
  imports: [
    MatDivider,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    RouterLink
  ],
  templateUrl: './checklist-detail.component.html',
  standalone: true,
  styleUrl: './checklist-detail.component.scss'
})
export class ChecklistDetailComponent implements OnInit {

  public todo!: ITodoDAO;
  public todoId!: number;
  public mode: MODE = MODE.VIEW;
  protected readonly Mode = MODE;
  protected readonly TYPE = TYPE;
  public types = [TYPE.LINK,TYPE.MAIL,TYPE.TEXT]
  public checklistTodoFormgroup: FormGroup;
  public linkContentArr: string[] = [];

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.checklistTodoFormgroup = this.fb.group({
      title: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      content: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.todoId = parseInt(params['todoId']);
      this.todoService.getTodoById(this.todoId).subscribe((todo: ITodoDAO) => {
        this.todo = todo;
        this.checklistTodoFormgroup.controls['title'].setValue(todo.title);
        this.checklistTodoFormgroup.controls['type'].setValue(todo.type);
        if (this.todo.type === TYPE.LINK) {
          this.linkContentArr = todo.content;
        } else {
          this.checklistTodoFormgroup.controls['content'].setValue(this.todo.content[0]);
        }
      });
    });
  }
  public deleteTodo() {
    this.todoService.deleteTodoById(this.todoId).subscribe( () => {
      this.router.navigateByUrl("/checklist");
      this._snackBar.open("Todo gelöscht", "", {duration: 2000});
    });
  }
}
