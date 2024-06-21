import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEmployeeTodoDAO} from "../models/IEmployeeTodoDAO";
import {IEmployeeTodoDTO} from "../models/IEmployeeTodoDTO";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private URI = "http://localhost:3000";

  constructor(
    private http: HttpClient,
  ) { }

  public getEmployeeTodoById(id: number): Observable<IEmployeeTodoDAO> {
    return this.http.get<IEmployeeTodoDAO>(this.URI + "/employee-to-todo/" + `${id}`);
  }

  public updateTodoState(employeeTodo: IEmployeeTodoDAO, newState: string): Observable<IEmployeeTodoDAO> {
    employeeTodo.state = newState;
    return this.http.patch<IEmployeeTodoDAO>(this.URI + "/employee-to-todo/" + employeeTodo.id, employeeTodo );
  }

  public updateTodoDescription(employeeTodo: IEmployeeTodoDAO, newDescription: string): Observable<IEmployeeTodoDAO> {
    employeeTodo.description = newDescription;
    return this.http.patch<IEmployeeTodoDAO>(this.URI + "/employee-to-todo/" + employeeTodo.id, employeeTodo );
  }
}
