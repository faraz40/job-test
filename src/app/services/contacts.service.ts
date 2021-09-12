import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  apiRoot: string = `https://6139e9371fcce10017e78ca3.mockapi.io/api/v1/`;
  contactDetails = {
    id: '',
    image_url: '',
    firstName: '',
    lastName: '',
    profession: '',
    details: {
      bio: '',
      email1: '',
      email2: '',
      meeting: '',
      dial: '',
      phone1: '',
      phone2: '',
    },
  };

  getContactsList(): Observable<any> {
    const apiURL = `${this.apiRoot}contacts`;
    return this.http.get<any[]>(apiURL).pipe(
      tap((_) => this.log('fetched conatcts list')),
      catchError(this.handleError<any[]>('getContactsList'))
    );
  }
  getContactDetails(id: number): Observable<any> {
    const apiURL = `${this.apiRoot}contact_details/${id}`;
    return this.http.get<any[]>(apiURL).pipe(
      tap((_) => this.log('fetched contact details')),
      catchError(this.handleError<any[]>('getContactDetails'))
    );
  }
}
