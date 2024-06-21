import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITodoDAO} from "../models/ITodoDAO";
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

  public getTodoById(id: number): Observable<ITodoDAO> {
    return this.http.get<ITodoDAO>(this.URI + "/todos/" + `${id}`);
  }

  public updateTodo(employeeTodo: IEmployeeTodoDAO, newState: string): Observable<IEmployeeTodoDAO> {
    employeeTodo.state = newState;
    return this.http.patch<IEmployeeTodoDAO>(this.URI + "/employee-to-todo/" + employeeTodo.id, employeeTodo );
  }
}
