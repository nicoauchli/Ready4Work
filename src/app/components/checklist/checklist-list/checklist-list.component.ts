import { Component } from '@angular/core';
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [
    MatDivider
  ],
  templateUrl: './checklist-list.component.html',
  styleUrl: './checklist-list.component.scss'
})
export class ChecklistListComponent {

}
