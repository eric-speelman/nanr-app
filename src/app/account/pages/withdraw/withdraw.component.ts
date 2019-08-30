import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AccountService, UserModel } from 'src/app/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'nanr-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithdrawComponent implements OnInit {
  account$: Observable<UserModel>;
  amountString$ = new BehaviorSubject<string>('');
  loading$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject<string>(null);
  success$ = new BehaviorSubject(false);
  amount = 0;
  constructor(private accountService: AccountService) {
    this.account$ = this.accountService.get();
  }

  ngOnInit() {
    this.setString(2);
    this.amount = 2;
  }

  change(ev) {
    this.setString(ev.value);
    this.amount = ev.value;
  }

  withdraw() {
    this.loading$.next(true);
    this.error$.next(null);
    this.success$.next(false);
    this.accountService.withdraw(this.amount).subscribe(res => {
      this.loading$.next(false);
      if (res.error) {
        this.error$.next(res.error);
      } else {
        this.success$.next(true);
      }
    });
  }

  private setString(value: number) {
    this.amountString$.next(`Withdraw ${value} Nanrs for $${((value - 1) * .2).toFixed(2)}`);
  }


}
