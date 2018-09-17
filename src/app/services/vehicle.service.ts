import { Injectable } from '@angular/core';
import {
  Headers,
  Http,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/Map';

import { apiUrl } from '../app.config';
import { Vehicle } from '../_interfaces';

@Injectable()
export class VehicleService {
  private vehiclesUrl = `${ apiUrl }/vehicles`;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get(this.vehiclesUrl)
      .map( res => (
        res.json().map((vehicle: Vehicle) => vehicle)
      ));
  }

  getVehicle(_id: string): Observable<Vehicle> {
    const url = `${this.vehiclesUrl}/${_id}`;
    return this.http.get(url)
      .map( res => res.json() as Vehicle);
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http
      .post(
        this.vehiclesUrl,
        JSON.stringify(vehicle),
        { headers: this.headers }
      )
      .map( res => res.json() as Vehicle);
  }

  updateVehicle(_id: string, vehicle: Vehicle): Observable<Vehicle> {
    const url = `${this.vehiclesUrl}/${_id}`;
    return this.http
      .put(
        url,
        JSON.stringify(vehicle),
        { headers: this.headers }
      )
      .map( res => res.json() as Vehicle);
  }

  deleteVehicle(_id: string): Observable<Response> {
    const url = `${this.vehiclesUrl}/${_id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .map( res => res.json());
  }
}
