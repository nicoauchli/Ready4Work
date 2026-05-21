import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../../services/todo.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {JsonPipe, NgClass, NgForOf} from "@angular/common";
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
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTooltip} from "@angular/material/tooltip";
import {ITodoDAO} from "../../../models/ITodoDAO";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-todo-detail',
  imports: [
    MatDivider,
    MatFormField,
    MatIcon,
    MatIconButton,
    TodoDetailTextComponent,
    TodoDetailMailComponent,
    TodoDetailLinkComponent,
    ReactiveFormsModule,
    MatButton,
    MatInput,
    NgClass,
    MatMenu,
    MatMenuItem,
    MatTooltip,
    MatMenuTrigger,
    RouterLink,
    CdkTextareaAutosize
  ],
  templateUrl: './todo-detail.component.html',
  standalone: true,
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent implements OnInit{

  private employeeTodoId!: number;
  public employeeTodo!: IEmployeeTodoDAO;
  public todo!: ITodoDAO;
  public descriptionform!: FormGroup;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.descriptionform = this.fb.group({
      description: []
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeTodoId = parseInt(params['employeeTodoId']);
      this.todoService.getEmployeeTodoById(this.employeeTodoId).subscribe((employeeTodo: IEmployeeTodoDAO) => {
        this.employeeTodo = employeeTodo;
        if (employeeTodo.todo.type == TYPE.MAIL) {
          employeeTodo.todo.content = [employeeTodo.todo.content.join('')]; // oder `.join('\n')` für Zeilenumbrüche
        }
        this.descriptionform.controls['description'].setValue(this.employeeTodo.description);
        this.todoService.getTodoById(this.employeeTodo.todoId).subscribe((todo: ITodoDAO) => {
          if (todo.type == TYPE.MAIL) {
              todo.content = [todo.content.join('')]; // oder `.join('\n')` für Zeilenumbrüche
          }
          this.todo = todo;
        });
      });
    });
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

  public getTodoClass(state: string): string {
    return `todo-state ${state}`
  }


  public deleteNonDefaultTodo(id: number) {
    this.todoService.deleteTodoById(id).subscribe(
      () => {
        this.snackBar.open('Todo erfolgreich gelöscht', 'Schließen', {
          duration: 3000,
        });
        this.router.navigateByUrl(`/emplyoees` + `/${this.employeeTodoId}`);
      },
        () => {
          this.snackBar.open('Fehler beim löschen des Todos', 'Schließen', {
            duration: 3000,
          });
        }
    );
  }

  public isDefaultTodo() {
    return this.todo.isDefault
  }

  adjustTextareaHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Setzt die Höhe zurück, damit sie nicht blockiert ist
    textarea.style.height = `${textarea.scrollHeight}px`; // Passt die Höhe an den Textinhalt an
  }

}
