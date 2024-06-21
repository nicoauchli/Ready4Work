import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../services/employee.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {IEmployeeDAO} from "../../../models/IEmployeeDAO";
import {MatList, MatListItem} from "@angular/material/list";
import {NgClass, NgForOf} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {TodoService} from "../../../services/todo.service";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {IEmployeeTodoDAO} from "../../../models/IEmployeeTodoDAO";

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
    NgClass
  ],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {

  private employeeId!: string;
  public employee!: IEmployeeDAO;
  public states = ['todo', 'doing', 'waiting', 'done'];

  constructor(
    private employeeService: EmployeeService,
    private todoService: TodoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
      this.employeeService.getEmployeeWithTodosById(parseInt(this.employeeId)).subscribe((employee: IEmployeeDAO) => {
          this.employee = employee;
      })
    })
  }

  public updateStatus(employeeTodo: IEmployeeTodoDAO, newState: string): void {
    this.todoService.updateTodo(employeeTodo, newState).subscribe(updatedTodo => {
      employeeTodo.state = updatedTodo.state;
    });
  }

  public getTodoClass(state: string): string {
    return `todo-item ${state}`
  }
}
