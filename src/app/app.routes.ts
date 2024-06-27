import { Routes } from '@angular/router';
import {EmployeesComponent} from "./components/employees/employees-list/employees.component";
import {EmployeeDetailComponent} from "./components/employees/employee-detail/employee-detail.component";
import {TodoDetailComponent} from "./components/todos/todo-detail/todo-detail.component";
import {ChecklistListComponent} from "./components/checklist/checklist-list/checklist-list.component";
import {ChecklistDetailComponent} from "./components/checklist/checklist-detail/checklist-detail.component";

export const routes: Routes = [
  { path: 'checklist', component: ChecklistListComponent},
  { path: 'checklist/:todoId', component: ChecklistDetailComponent },
  { path: 'employees', component: EmployeesComponent},
  { path: 'employees/:id', component: EmployeeDetailComponent},
  { path: 'employees/:id/todos/:todoId', component: TodoDetailComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
