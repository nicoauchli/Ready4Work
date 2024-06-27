import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEmployeeTodoDAO} from "../models/IEmployeeTodoDAO";
import {ITodoDAO} from "../models/ITodoDAO";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private URI = "http://localhost:3000";

  constructor(
    private http: HttpClient,
  ) { }
  // Get employeeTodo with all his todos
  public getEmployeeTodoById(id: number): Observable<IEmployeeTodoDAO> {
    return this.http.get<IEmployeeTodoDAO>(this.URI + "/employee-to-todo/" + `${id}`);
  }
  // Update state of a employeeTodo
  public updateTodoState(employeeTodo: IEmployeeTodoDAO, newState: string): Observable<IEmployeeTodoDAO> {
    employeeTodo.state = newState;
    return this.http.patch<IEmployeeTodoDAO>(this.URI + "/employee-to-todo/" + employeeTodo.id, employeeTodo );
  }
  // Update description of a employeeTodo
  public updateTodoDescription(employeeTodo: IEmployeeTodoDAO, newDescription: string): Observable<IEmployeeTodoDAO> {
    employeeTodo.description = newDescription;
    return this.http.patch<IEmployeeTodoDAO>(this.URI + "/employee-to-todo/" + employeeTodo.id, employeeTodo );
  }
  // Get all default Todos
  public getAllDefaultTodos(): Observable<ITodoDAO[]> {
    return this.http.get<ITodoDAO[]>(this.URI + "/todos");
  }
  // Get todo by id
  public getTodoById(todoId: number): Observable<ITodoDAO> {
    return this.http.get<ITodoDAO>(this.URI + "/todos/" + todoId);
  }
}
