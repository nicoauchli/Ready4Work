import { Component } from '@angular/core';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";

import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ITodoDTO} from "../../../models/ITodoDTO";
import { TYPE } from '../../../enums/Type';
import {TodoService} from "../../../services/todo.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {IEmployeeTodoDTO} from "../../../models/IEmployeeTodoDTO";
import {ITodoDAO} from "../../../models/ITodoDAO";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-todo-create',
    imports: [
    CdkTextareaAutosize,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    RouterLink
],
    templateUrl: './todo-create.component.html',
    styleUrl: './todo-create.component.scss'
})
export class TodoCreateComponent {
  public createEmployeeTodoForm: FormGroup;
  public types = [TYPE.TEXT, TYPE.LINK, TYPE.MAIL];
  public states = ['todo', 'doing', 'waiting', 'done'];
  protected readonly TYPE = TYPE;
  public linkContentArr: string[] = [];
  public employeeId!: number;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.employeeId = parseInt(params['id']);
    });
    this.createEmployeeTodoForm = this.fb.group({
      title: new FormControl("", [Validators.required]),
      type: new FormControl("text", [Validators.required]),
      content: new FormControl("", [Validators.required]),
    });
  }

  public submitEmployeeTodo() {
    const newTodo: ITodoDTO = {
      title: this.createEmployeeTodoForm.controls['title'].value,
      type: this.createEmployeeTodoForm.controls['type'].value,
      isDefault: false,
      content: this.createEmployeeTodoForm.controls['type'].value === TYPE.LINK ? this.linkContentArr : this.createEmployeeTodoForm.controls['content'].value    }
    this.todoService.createTodo(newTodo).subscribe( (todo: ITodoDAO) => {
      const newEmployeeTodo: IEmployeeTodoDTO = {
        employeeId: this.employeeId,
        description: "",
        todoId: todo.id,
        state: "todo",
      }
      this.todoService.createEmployeeTodo(newEmployeeTodo).subscribe( () => {
        this._snackBar.open("Todo erstellt", "", { duration: 2000 });
        this.router.navigateByUrl(`/employees/${this.employeeId}`);
      })
    });
  }


  public addLinkToContent() {
    this.linkContentArr.push(this.createEmployeeTodoForm.controls['content'].value);
  }

  public clearContent() {
    this.createEmployeeTodoForm.controls['content'].reset();
  }
}
