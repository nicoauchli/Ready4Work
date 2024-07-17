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
import {ActivatedRoute, Router} from "@angular/router";
import {Mode} from "../../../enums/mode";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgClass, NgForOf} from "@angular/common";
import {TYPE} from "../../../enums/Type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

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
    MatTooltip,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    MatCardTitle,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    NgClass,
    CdkTextareaAutosize
  ],
  templateUrl: './checklist-detail.component.html',
  styleUrl: './checklist-detail.component.scss'
})
export class ChecklistDetailComponent implements OnInit {

  public todo!: ITodoDAO;
  public todoId!: number;
  public mode: Mode = Mode.VIEW;
  protected readonly Mode = Mode;
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
        if (this.todo.type !== TYPE.LINK) {
          this.checklistTodoFormgroup.controls['content'].setValue(this.todo.content[0] || '');
        }
      });
    });
  }

  public changeMode() {
    this.mode = this.mode === Mode.VIEW ? Mode.EDIT : Mode.VIEW;
  }

  public addLinkToContent() {
    this.linkContentArr.push(this.checklistTodoFormgroup.controls['content'].value);
  }

  public saveUpdatedTodo() {
    if (this.todo.type !== TYPE.LINK) {
      this.todo.content = [this.checklistTodoFormgroup.controls['content'].value];
    }
    console.log(this.todo);
  }

  // For type link to add multiple links
  public addToTodoContent() {
    if (this.todo.type === TYPE.LINK) {
      const link = this.checklistTodoFormgroup.controls['content'].value;
      if (!this.todo.content) {
        this.todo.content = [];
      }
      this.todo.content.push(link);
      this.checklistTodoFormgroup.controls['content'].setValue("");
    }
  }
  // When changing the type of todo clean the content
  public changeTypeForEdit() {
    this.todo.content = [];
    this.checklistTodoFormgroup.controls['content'].setValue("");
  }
  public removeLink(index: number) {
    if (this.todo.type === TYPE.LINK) {
      this.todo.content.splice(index, 1);
    }
  }

  public clearContent() {
    this.checklistTodoFormgroup.controls['content'].reset();
  }

  public deleteTodo() {
    this.todoService.deleteTodoById(this.todoId).subscribe( () => {
      this.router.navigateByUrl("/checklist");
      this._snackBar.open("Todo gelöscht", "", {duration: 2000});
    });
  }
}
