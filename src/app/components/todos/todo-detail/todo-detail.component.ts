import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../../services/todo.service";
import {ActivatedRoute} from "@angular/router";
import {JsonPipe, NgForOf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatList, MatListItem} from "@angular/material/list";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {TYPE} from "../../../enums/Type";
import {TodoDetailTextComponent} from "./todo-detail-text/todo-detail-text.component";
import {TodoDetailMailComponent} from "./todo-detail-mail/todo-detail-mail.component";
import {TodoDetailLinkComponent} from "./todo-detail-link/todo-detail-link.component";
import {IEmployeeTodoDAO} from "../../../models/IEmployeeTodoDAO";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatInput} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    TodoDetailLinkComponent,
    ReactiveFormsModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatInput
  ],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent implements OnInit{

  private todoId!: number;
  public employeeTodo!: IEmployeeTodoDAO;
  public descriptionform!: FormGroup;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.descriptionform = this.fb.group({
      description: ['']
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.todoId = parseInt(params['todoId']);
      this.todoService.getEmployeeTodoById(this.todoId).subscribe( (employeeTodo: IEmployeeTodoDAO) => {
        this.employeeTodo = employeeTodo;
      });
    })
  }

  protected readonly TYPE = TYPE;

  public saveDescription(): void {
    this.todoService.updateTodoDescription(this.employeeTodo, this.descriptionform.controls['description'].value)
      .subscribe(
        () => {
          this.snackBar.open('Beschreibung erfolgreich gespeichert', 'Schließen', {
            duration: 3000,
          });
        },
        () => {
          this.snackBar.open('Fehler beim Speichern der Beschreibung', 'Schließen', {
            duration: 3000,
          });
        }
      );
  }
}
