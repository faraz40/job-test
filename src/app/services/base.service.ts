import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(protected http: HttpClient) {}

  protected handleError<T>(
    operation = 'operation',
    result?: T,
    service?: string
  ) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`, service);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public log(message: string, service: string = '') {
    console.log(`${service} : ${message}`);
  }
}
