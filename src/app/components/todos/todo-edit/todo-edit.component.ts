import {Component, OnInit} from '@angular/core';
import {ITodoDAO} from "../../../models/ITodoDAO";
import {TodoService} from "../../../services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { TYPE } from '../../../enums/Type';

@Component({
    selector: 'app-todo-edit',
    imports: [
        CdkTextareaAutosize,
        MatButton,
        MatDivider,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        NgForOf,
        ReactiveFormsModule
    ],
    templateUrl: './todo-edit.component.html',
    styleUrl: './todo-edit.component.scss'
})
export class TodoEditComponent implements OnInit {

  public todo!: ITodoDAO;
  public todoId!: number;
  protected readonly TYPE = TYPE;
  public types = [TYPE.LINK,TYPE.MAIL,TYPE.TEXT]
  public todoFormgroup: FormGroup;
  public linkContentArr: string[] = [];

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.todoFormgroup = this.fb.group({
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
        this.todoFormgroup.controls['title'].setValue(todo.title);
        this.todoFormgroup.controls['type'].setValue(todo.type);
        if (this.todo.type === TYPE.LINK) {
          this.linkContentArr = todo.content;
        } else {
          this.todoFormgroup.controls['content'].setValue(this.todo.content[0]);
        }
      });
    });
  }

  public addToTodoContent() {
    if (this.todo.type === TYPE.LINK) {
      const link = this.todoFormgroup.controls['content'].value;
      this.todo.content.push(link);
    }
  }

  public changeTypeForEdit() {
    console.log("change called")
    if (this.todo.content) {
      console.log("content clear")
      this.todo.content = [];
      this.todoFormgroup.controls['content'].setValue("");
    }
  }

  public removeLink(index: number) {
    if (this.todo.type === TYPE.LINK) {
      this.todo.content.splice(index, 1);
    }
  }

  public updateTodo() {
    if (this.todo.type !== TYPE.LINK) {
      this.todo.content = [this.todoFormgroup.controls['content'].value];
    } else {
      this.todo.content = this.linkContentArr;
    }
    this.todo.title = this.todoFormgroup.controls['title'].value;
    this.todo.type = this.todoFormgroup.controls['type'].value;
    this.todoService.updateTodo(this.todo.id, this.todo).subscribe( () => {
      this.router.navigate(['/employees/']);
    });
  }

}
