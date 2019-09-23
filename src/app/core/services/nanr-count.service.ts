import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class NanrCountService {
  private nanrCount$ = new BehaviorSubject<number>(0);
  count: number;
  constructor(private accountService: AccountService) {
    if (window.localStorage.getItem('session')) {
      this.accountService.get().subscribe(user => {
        this.setCount(user.balance);
      });
    }
  }

  getCount() {
    return this.nanrCount$.asObservable();
  }

  setCount(count: number) {
    this.count = count;
    this.nanrCount$.next(count);
  }

  minus(amount: number = 1) {
    this.count -= amount;
    if (this.count < 0) {
      this.count = 0;
    }
    this.nanrCount$.next(this.count);
  }

  add(amount: number) {
    this.count += amount;
    this.nanrCount$.next(this.count);
  }
}
