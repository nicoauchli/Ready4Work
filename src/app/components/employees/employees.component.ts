import {Component, OnInit} from '@angular/core';
import {
  MatActionList,
  MatList,
  MatListItem,
  MatListItemIcon, MatListItemTitle,
  MatListSubheaderCssMatStyler
} from "@angular/material/list";
import {EmployeeService} from "../../services/employee.service";
import {IEmployeeDAO} from "../../models/IEmployeeDAO";
import {JsonPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    MatList,
    MatListSubheaderCssMatStyler,
    MatActionList,
    JsonPipe,
    MatListItem,
    MatIcon,
    MatListItemIcon,
    MatListItemTitle
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {

  public employees: IEmployeeDAO[] = [];

  constructor(
    private employeeService: EmployeeService,
  ) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((employees: IEmployeeDAO[]) => {
      console.log(employees)
      this.employees = employees
    })
  }

}
