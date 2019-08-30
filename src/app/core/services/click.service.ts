import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClickResponseModel } from './models';

@Injectable({
  providedIn: 'root'
})
export class ClickService {

  constructor(private http: HttpClient) { }

  sendClick(username: string) {
    const url = `${environment.apiUrl}click`;
    return this.http.post<ClickResponseModel>(url, {username});
  }
}
