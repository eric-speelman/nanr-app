import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel, ProfileModel } from './models';
import { share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  get() {
    const url = `${environment.apiUrl}me`;
    return this.http.get<UserModel>(url).pipe(
      share()
    );
  }

  withdraw(withdraw: {amount: number, email: string}) {
    const url = `${environment.apiUrl}withdraw`;
    return this.http.post<{success: boolean, error: string}>(url, withdraw);
  }

  profile() {
    const url = `${environment.apiUrl}account/profile`;
    return this.http.get<ProfileModel>(url).pipe(
      share()
    );
  }

  updateProfile(profile: {email: string}) {
    const url = `${environment.apiUrl}account/profile`;
    return this.http.post(url, profile);
  }

  changePassword(passwords: {password: string, newPassword: string}) {
    const url = `${environment.apiUrl}account/change-password`;
    return this.http.post(url, passwords);
  }

  logout() {
    const url = `${environment.apiUrl}account/logout`;
    return this.http.post(url, {}).pipe(
      tap(() => window.localStorage.removeItem('session'))
    );
  }
}
