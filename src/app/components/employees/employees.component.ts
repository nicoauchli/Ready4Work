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
import {MatDivider} from "@angular/material/divider";
import {RouterLink} from "@angular/router";
import {LoadingService} from "../../services/loading.service";

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
    MatListItemTitle,
    MatDivider,
    RouterLink
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {

  public employees: IEmployeeDAO[] = [];

  constructor(
    private employeeService: EmployeeService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
      this.employeeService.getEmployees().subscribe((employees: IEmployeeDAO[]) => {
        this.employees = employees
      })
  }

}
