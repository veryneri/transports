import {
  Headers,
  Http
} from '@angular/http';

export abstract class AbstractService {
  protected http: Http;
  protected headers = new Headers({ 'Content-Type': 'application/json' });

  constructor() { }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
