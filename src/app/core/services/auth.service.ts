import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { SessionModel, SignupResponseModel } from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: {email: string, password: string}): Observable<SessionModel> {
    const url = `${environment.apiUrl}login`;
    return this.http.post<SessionModel>(url, credentials);
  }

  signup(info: {email: string, username: string, password: string}) {
    const url = `${environment.apiUrl}signup`;
    return this.http.post<SignupResponseModel>(url, info);
  }

  resetPassword(email: string) {
    const url = `${environment.apiUrl}account/reset-password`;
    return this.http.post(url, {email});
  }

  resetPasswordSet(reset: {token: string, password: string}) {
    const url = `${environment.apiUrl}account/reset-password-set`;
    return this.http.post(url, reset);
  }
}
