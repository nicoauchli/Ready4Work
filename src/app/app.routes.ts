import { Routes } from '@angular/router';
import {EmployeesComponent} from "./components/employees/employees-list/employees.component";
import {EmployeeDetailComponent} from "./components/employees/employee-detail/employee-detail.component";
import {TodoDetailComponent} from "./components/todos/todo-detail/todo-detail.component";

export const routes: Routes = [
  { path: 'employees', component: EmployeesComponent},
  { path: 'employees-list/:id', component: EmployeeDetailComponent},
  { path: 'employees-list/:id/todos/:todoId', component: TodoDetailComponent},
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
