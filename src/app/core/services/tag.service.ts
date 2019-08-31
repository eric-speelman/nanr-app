import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TagResponseModel } from './models';


@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  get() {
    const url = `${environment.apiUrl}tag`;
    return this.http.get<TagResponseModel>(url);
  }

  click() {

  }
}
