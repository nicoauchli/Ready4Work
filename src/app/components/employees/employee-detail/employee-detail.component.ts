import {Component, inject, OnInit} from '@angular/core';
import {EmployeeService} from "../../../services/employee.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {IEmployeeDAO} from "../../../models/IEmployeeDAO";
import {MatList, MatListItem} from "@angular/material/list";
import {NgClass, NgForOf} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {TodoService} from "../../../services/todo.service";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {IEmployeeTodoDAO} from "../../../models/IEmployeeTodoDAO";
import {MatTooltip} from "@angular/material/tooltip";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  DialogAddNewEmployeeComponent
} from "../employees-list/dialog-add-new-employee/dialog-add-new-employee.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogEditEmployeeComponent} from "./dialog-edit-employee/dialog-edit-employee.component";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    NgForOf,
    MatFormField,
    MatSelect,
    MatOption,
    RouterLink,
    MatDivider,
    MatIcon,
    MatIconButton,
    NgClass,
    MatTooltip,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {

  public employeeId!: number;
  public employee!: IEmployeeDAO;
  public states = ['todo', 'doing', 'waiting', 'done'];
  readonly dialogEditEmployee = inject(MatDialog);


  constructor(
    private employeeService: EmployeeService,
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = parseInt(params['id']);
      this.employeeService.getEmployeeWithTodosById(this.employeeId).subscribe((employee: IEmployeeDAO) => {
          this.employee = employee;
      })
    })
  }

  public updateStatus(employeeTodo: IEmployeeTodoDAO, newState: string): void {
    this.todoService.updateTodoState(employeeTodo, newState).subscribe(updatedTodo => {
      employeeTodo.state = updatedTodo.state;
    });
  }

  public getTodoClass(state: string): string {
    return `todo-item ${state}`
  }

  public deleteEmployee() {
    this.employeeService.deleteEmployeeById(this.employeeId).subscribe((value) => {
      this.router.navigateByUrl("/employees");
      this._snackBar.open("Mitarbeiter gelöscht", "", {duration: 2000});
    });
  }

  public openDialogEditEmployee() {
    const dialogRef = this.dialogEditEmployee.open(DialogEditEmployeeComponent, {
      data: { employee: this.employee }
    });
    dialogRef.componentInstance.employeeEdited.subscribe((employee ) => {
      this.employee = employee
    });
  }

  public updateEmployeeDefaultTodos() {
    this.employeeService.updateEmployeeDefaultTodos(this.employee).subscribe((todos) => {
      this.employee.todos = todos;
    });
  }
}
