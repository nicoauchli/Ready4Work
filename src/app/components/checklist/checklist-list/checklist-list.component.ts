import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatDivider
  ],
  templateUrl: './checklist-list.component.html',
  styleUrl: './checklist-list.component.scss'
})
export class ChecklistListComponent {

}
