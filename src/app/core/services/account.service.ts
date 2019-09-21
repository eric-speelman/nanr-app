import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel, ProfileModel, StandModel } from './models';
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

  updateProfile(profile: {email?: string, tagline?: string, bio?: string, backgroundColor?: string, darkText?: boolean}) {
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

  uploadProfilePic(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${environment.apiUrl}account/upload/profile-pic`;
    return this.http.post(url, formData);
  }

  uploadStandPic(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${environment.apiUrl}account/upload/stand-pic`;
    return this.http.post(url, formData);
  }

  deleteStandBackground() {
    const url = `${environment.apiUrl}account/stand-pic`;
    return this.http.delete(url);
  }

  getStand(username: string) {
    const url = `${environment.apiUrl}stand`;
    const params = new HttpParams().set('username', username);
    return this.http.get<StandModel>(url, {params}).pipe(
      share()
    );
  }
}
