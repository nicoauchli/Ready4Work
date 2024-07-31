import { Routes } from '@angular/router';
import {EmployeesComponent} from "./components/employees/employees-list/employees.component";
import {EmployeeDetailComponent} from "./components/employees/employee-detail/employee-detail.component";
import {TodoDetailComponent} from "./components/todos/todo-detail/todo-detail.component";
import {ChecklistListComponent} from "./components/checklist/checklist-list/checklist-list.component";
import {ChecklistDetailComponent} from "./components/checklist/checklist-detail/checklist-detail.component";
import {ChecklistCreateComponent} from "./components/checklist/checklist-create/checklist-create.component";
import {ChecklistEditComponent} from "./components/checklist/checklist-edit/checklist-edit.component";
import {TodoCreateComponent} from "./components/todos/todo-create/todo-create.component";
import {TodoEditComponent} from "./components/todos/todo-edit/todo-edit.component";

export const routes: Routes = [
  { path: 'checklist', component: ChecklistListComponent},
  { path: 'checklist/create', component: ChecklistCreateComponent},
  { path: 'checklist/:todoId', component: ChecklistDetailComponent },
  { path: 'checklist/:todoId/edit', component: ChecklistEditComponent },
  { path: 'employees', component: EmployeesComponent},
  { path: 'employees/:id', component: EmployeeDetailComponent},
  { path: 'employees/:id/create', component: TodoCreateComponent },
  { path: 'employees/:id/todos/:employeeTodoId', component: TodoDetailComponent },
  { path: 'employees/:id/todos/:todoId/edit', component: TodoEditComponent },
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: '**', redirectTo: 'employees', pathMatch: 'full' },
];
