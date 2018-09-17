import { Injectable } from '@angular/core';
import {
  Headers,
  Http,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/Map';

import { apiUrl } from '../app.config';
import { Assignment } from '../_interfaces';

@Injectable()
export class AssignmentService {
  private assignmentsUrl = `${ apiUrl }/assignments`;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get(this.assignmentsUrl)
      .map( res => (
        res.json().map((assignment: Assignment) => assignment)
      ));
  }

  getAssignment(_id: string): Observable<Assignment> {
    const url = `${this.assignmentsUrl}/${_id}`;
    return this.http.get(url)
      .map( res => res.json() as Assignment);
  }

  createAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http
      .post(
        this.assignmentsUrl,
        JSON.stringify(assignment),
        { headers: this.headers }
      )
      .map( res => res.json() as Assignment);
  }

  updateAssignment(_id: string, assignment: Assignment): Observable<Assignment> {
    const url = `${this.assignmentsUrl}/${_id}`;
    return this.http
      .put(
        url,
        JSON.stringify(assignment),
        { headers: this.headers }
      )
      .map( res => res.json() as Assignment);
  }

  deleteAssignment(_id: string): Observable<Response> {
    const url = `${this.assignmentsUrl}/${_id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .map( res => res.json());
  }
}
