import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../services/employee.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {IEmployeeDAO} from "../../../models/IEmployeeDAO";
import {MatList, MatListItem} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {ITodoDAO} from "../../../models/ITodoDAO";
import {TodoService} from "../../../services/todo.service";
import {ITodoUpdateState} from "../../../models/ITodoUpdateState";

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
    RouterLink
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
      this.employeeService.getEmployeeById(parseInt(this.employeeId)).subscribe((employee: IEmployeeDAO) => {
          this.employee = employee;
      })
    })
  }

  public updateStatus(todo: ITodoDAO, newState: ITodoUpdateState): void {
    this.todoService.updateTodo(todo.id, newState).subscribe(updatedTodo => {
      todo.state = updatedTodo.state;
    });
  }
}
