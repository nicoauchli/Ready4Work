import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITodoDAO} from "../models/ITodoDAO";
import {ITodoUpdateState} from "../models/ITodoUpdateState";

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

  public updateTodo(id: number, state: ITodoUpdateState): Observable<ITodoDAO> {
    return this.http.patch<ITodoDAO>(this.URI + "/todos/" + id + "/state", {state: state} );
  }
}
