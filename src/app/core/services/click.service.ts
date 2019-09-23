import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClickResponseModel } from './models';
import { NanrCountService } from './nanr-count.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClickService {

  constructor(private http: HttpClient, private nanrCount: NanrCountService) { }

  sendClick(username: string) {
    const url = `${environment.apiUrl}click`;
    return this.http.post<ClickResponseModel>(url, {username}).pipe(
      tap(() => this.nanrCount.minus())
    );
  }
}
