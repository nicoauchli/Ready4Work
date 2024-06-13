import { Component } from '@angular/core';
import {MatActionList, MatList, MatListSubheaderCssMatStyler} from "@angular/material/list";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    MatList,
    MatListSubheaderCssMatStyler,
    MatActionList
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

}
