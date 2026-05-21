import {Component, inject, OnInit} from '@angular/core';
import {
  MatActionList,
  MatList,
  MatListItem,
  MatListItemIcon, MatListItemTitle,
  MatListSubheaderCssMatStyler
} from "@angular/material/list";
import {EmployeeService} from "../../../services/employee.service";
import {IEmployeeDAO} from "../../../models/IEmployeeDAO";
import {JsonPipe, NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {RouterLink} from "@angular/router";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddNewEmployeeComponent} from "./dialog-add-new-employee/dialog-add-new-employee.component";

@Component({
  selector: 'app-employees-list',
  imports: [
    MatActionList,
    MatListItem,
    MatIcon,
    MatListItemIcon,
    MatListItemTitle,
    MatDivider,
    RouterLink,
    MatIconButton,
    MatTooltip,
    NgClass
  ],
  templateUrl: './employees.component.html',
  standalone: true,
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {

  public employees: IEmployeeDAO[] = [];
  readonly dialogAddNewEmployee = inject(MatDialog);

  constructor(
    private employeeService: EmployeeService,
  ) { }

  ngOnInit() {
      this.employeeService.getEmployees().subscribe((employees: IEmployeeDAO[]) => {
        this.employees = employees
      })
  }

  public openDialogAddNewEmployee() {
    const dialogRef = this.dialogAddNewEmployee.open(DialogAddNewEmployeeComponent);
    dialogRef.componentInstance.employeeAdded.subscribe((employee ) => {
      this.employees.push(employee); // Add the new employee to the list
      this.employees = [...this.employees]; // Ensure the list updates
    });
  }
}
