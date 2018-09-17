import { Injectable } from '@angular/core';
import {
  Headers,
  Http,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/Map';

import { apiUrl } from '../app.config';
import { Employee } from '../_interfaces';

@Injectable()
export class EmployeeService {
  private employeesUrl = `${ apiUrl }/employees`;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get(this.employeesUrl)
      .map( res => (
        res.json().map((employee: Employee) => employee)
      ));
  }

  getEmployee(_id: string): Observable<Employee> {
    const url = `${this.employeesUrl}/${_id}`;
    return this.http.get(url)
      .map( res => res.json() as Employee);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post(
        this.employeesUrl,
        JSON.stringify(employee),
        { headers: this.headers }
      )
      .map( res => res.json() as Employee);
  }

  updateEmployee(_id: string, employee: Employee): Observable<Employee> {
    const url = `${this.employeesUrl}/${_id}`;
    return this.http
      .put(
        url,
        JSON.stringify(employee),
        { headers: this.headers }
      )
      .map( res => res.json() as Employee);
  }

  deleteEmployee(_id: string): Observable<Response> {
    const url = `${this.employeesUrl}/${_id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .map( res => res.json());
  }
}
