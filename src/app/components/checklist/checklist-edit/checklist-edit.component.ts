import {Component, OnInit} from '@angular/core';
import {ITodoDAO} from "../../../models/ITodoDAO";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TodoService} from "../../../services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import { TYPE } from '../../../enums/Type';
import {MODE} from "../../../enums/Mode";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-checklist-edit',
  standalone: true,
  imports: [
    CdkTextareaAutosize,
    MatButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    ReactiveFormsModule,
    MatDivider,
    MatMenu,
    MatMenuItem,
    MatTooltip
  ],
  templateUrl: './checklist-edit.component.html',
  styleUrl: './checklist-edit.component.scss'
})
export class ChecklistEditComponent implements OnInit {

  public todo!: ITodoDAO;
  public todoId!: number;
  protected readonly TYPE = TYPE;
  public types = [TYPE.LINK,TYPE.MAIL,TYPE.TEXT]
  public checklistTodoFormgroup: FormGroup;
  public linkContentArr: string[] = [];

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
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

  public addToTodoContent() {
    if (this.todo.type === TYPE.LINK) {
      const link = this.checklistTodoFormgroup.controls['content'].value;
      this.todo.content.push(link);
    }
  }

  public changeTypeForEdit() {
    if (this.todo.content) {
      this.todo.content = [];
      this.checklistTodoFormgroup.controls['content'].setValue("");
    }
  }

  public removeLink(index: number) {
    if (this.todo.type === TYPE.LINK) {
      this.todo.content.splice(index, 1);
    }
  }

  public updateChecklistTodo() {
    if (this.todo.type !== TYPE.LINK) {
      this.todo.content = [this.checklistTodoFormgroup.controls['content'].value];
    } else {
      this.todo.content = this.linkContentArr;
    }
    this.todo.title = this.checklistTodoFormgroup.controls['title'].value;
    this.todo.type = this.checklistTodoFormgroup.controls['type'].value;
    this.todoService.updateTodo(this.todo.id, this.todo).subscribe( () => {
        this.router.navigate(['/checklist']);
    });
  }

}
