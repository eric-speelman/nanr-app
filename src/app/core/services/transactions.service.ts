import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TransactionResponseModel } from './models';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  get() {
    const url = `${environment.apiUrl}transactions`;
    return this.http.get<TransactionResponseModel>(url);
  }
}
