import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TransactionResponseModel, HomeSummaryModel } from './models';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  get() {
    const url = `${environment.apiUrl}transactions`;
    return this.http.get<TransactionResponseModel>(url);
  }

  homeSummary() {
    const url = `${environment.apiUrl}account/home-summary`;
    return this.http.get<HomeSummaryModel>(url);
  }
}
