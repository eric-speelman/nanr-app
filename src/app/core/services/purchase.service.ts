import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PurchaseResponseModel } from './models';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  constructor(private http: HttpClient) { }

  purchase(purchase: {amount: string, token?: string, saveBilling?: boolean, useSaved?: boolean, refill?: boolean}) {
    const url = `${environment.apiUrl}purchase`;
    return this.http.post<PurchaseResponseModel>(url, purchase);
  }
}
