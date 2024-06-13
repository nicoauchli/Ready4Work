import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEmployeeDAO} from "../models/IEmployeeDAO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URI = "127.0.0.1:8080";

  constructor(
    private http: HttpClient
  ) { }


  public getEmployees(): Observable<IEmployeeDAO[]> {
    return this.http.get<IEmployeeDAO[]>(this.URI + "/employees");
  }
}
