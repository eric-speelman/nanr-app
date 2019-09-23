import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }

  send(contact: {email: string, message: string}) {
    const url = `${environment.apiUrl}contact`;
    return this.http.post<void>(url, contact);
  }
}
