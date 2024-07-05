import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEmployeeDAO} from "../models/IEmployeeDAO";
import {Observable} from "rxjs";
import {IEmployeeDTO} from "../models/IEmployeeDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URI = "http://localhost:3000";

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

  public deleteEmployeeById(employeeId: number): Observable<any> {
    return this.http.delete<any>(this.URI + "/employees/" + employeeId);
  }
}
