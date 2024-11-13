import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEmployeeDAO} from "../models/IEmployeeDAO";
import {Observable} from "rxjs";
import {IEmployeeDTO} from "../models/IEmployeeDTO";
import {IEmployeeTodoDAO} from "../models/IEmployeeTodoDAO";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URI = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  public getEmployees(): Observable<IEmployeeDAO[]> {
    return this.http.get<IEmployeeDAO[]>(this.URI + "/employees");
  }

  public getEmployeeWithTodosById(id: number): Observable<IEmployeeDAO> {
    return this.http.get<IEmployeeDAO>(this.URI + `/employees/${id}/todos`);
  }

  public addNewEmployee(employee: IEmployeeDTO): Observable<IEmployeeDAO> {
    return this.http.post<IEmployeeDAO>(this.URI + "/employees", employee);
  }

  public updateEmployee(employee: IEmployeeDAO): Observable<IEmployeeDAO> {
    return this.http.patch<IEmployeeDAO>(this.URI + "/employees/" + employee.id, employee);
  }

  public deleteEmployeeById(employeeId: number): Observable<any> {
    return this.http.delete<any>(this.URI + "/employees/" + employeeId);
  }
  // Update missing default todos for a employee
  public updateEmployeeDefaultTodos(employee: IEmployeeDAO): Observable<IEmployeeTodoDAO[]> {
    return this.http.get<IEmployeeTodoDAO[]>(this.URI + "/employee-to-todo/" + employee.id + "/user-checklist-update");
  }
}
