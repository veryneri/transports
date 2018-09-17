import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AbstractService } from './_abstract.service.promise';
import { apiUrl } from '../app.config';
import { Employee } from '../_interfaces';

@Injectable()
export class EmployeeService extends AbstractService {
  private employeesUrl = 'employees';

  constructor() {
    super();
  }

  getEmployees(): Promise<Employee[]> {
    return this.http.get(this.employeesUrl)
      .toPromise()
      .then(response => response.json().data as Employee[])
      .catch(this.handleError);
  }

  getEmployee(_id: number): Promise<Employee> {
    const url = `${this.employeesUrl}/${_id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Employee)
      .catch(this.handleError);
  }

  createEmployee(employee: Employee): Promise<Employee> {
    return this.http
      .post(this.employeesUrl, JSON.stringify(employee), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data as Employee)
      .catch(this.handleError);
  }

  updateEmployee(_id: string, employee: Employee): Promise<Employee> {
    const url = `${this.employeesUrl}/${_id}`;
    return this.http
      .put(url, JSON.stringify(employee), { headers: this.headers })
      .toPromise()
      .then(() => employee)
      .catch(this.handleError);
  }

  deleteEmployee(_id: string, employee: Employee): Promise<void> {
    const url = `${this.employeesUrl}/${_id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
