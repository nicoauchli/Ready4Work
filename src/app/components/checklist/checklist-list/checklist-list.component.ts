import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDivider} from "@angular/material/divider";
import {MatActionList, MatListItem, MatListItemIcon, MatListItemTitle} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {ITodoDAO} from "../../../models/ITodoDAO";
import {TodoService} from "../../../services/todo.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatDivider,
    MatActionList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    RouterLink,
    NgClass
  ],
  templateUrl: './checklist-list.component.html',
  styleUrl: './checklist-list.component.scss'
})
export class ChecklistListComponent implements OnInit {

  public todos!: ITodoDAO[];

  constructor(
    private todoService: TodoService,
  ) { }


  ngOnInit() {
    this.todoService.getAllDefaultTodos().subscribe( (todos: ITodoDAO[]) => {
      this.todos = todos;
    });
  }
}
