import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel } from './models';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  get() {
    const url = `${environment.apiUrl}me`;
    return this.http.get<UserModel>(url).pipe(
      first()
    );
  }

  withdraw(amount: number) {
    const url = `${environment.apiUrl}withdraw`;
    return this.http.post<{success: boolean, error: string}>(url, {amount});
  }
}
