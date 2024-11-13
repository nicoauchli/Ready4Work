import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEmployeeTodoDAO} from "../models/IEmployeeTodoDAO";
import {ITodoDAO} from "../models/ITodoDAO";
import {ITodoDTO} from "../models/ITodoDTO";
import {IEmployeeTodoDTO} from "../models/IEmployeeTodoDTO";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private URI = environment.apiUrl

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
  // Update whole todo
  public updateTodo(id: number, todo: ITodoDAO): Observable<ITodoDAO> {
    return this.http.patch<ITodoDAO>(this.URI + "/todos/" + id, todo);
  }
  // Create new Todo
  public createTodo(todo: ITodoDTO): Observable<ITodoDAO> {
    return this.http.post<ITodoDAO>(this.URI + "/todos", todo);
  }
  // Create EmployeeTodo
  public createEmployeeTodo(employeeTodo: IEmployeeTodoDTO): Observable<IEmployeeTodoDAO> {
    return this.http.post<IEmployeeTodoDAO>(this.URI + "/employee-to-todo", employeeTodo);
  }
  // Get all default Todos
  public getAllDefaultTodos(): Observable<ITodoDAO[]> {
    return this.http.get<ITodoDAO[]>(this.URI + "/todos/default");
  }
  // Get todo by id
  public getTodoById(todoId: number): Observable<ITodoDAO> {
    return this.http.get<ITodoDAO>(this.URI + "/todos/" + todoId);
  }
  public deleteTodoById(id: number): Observable<any> {
    return this.http.delete(this.URI + "/todos/" + id);
  }
}
