import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { AccountService, UserModel } from 'src/app/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'nanr-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithdrawComponent implements OnInit {
  @ViewChild('emailInput', {static: false}) emailInput: ElementRef;
  account$: Observable<UserModel>;
  amountString$ = new BehaviorSubject<string>('');
  loading$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject<string>(null);
  emailError$ = new BehaviorSubject(false);
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
    const email = this.emailInput.nativeElement.value;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      this.emailError$.next(true);
    } else {
      this.emailError$.next(false);
      this.loading$.next(true);
      this.error$.next(null);
      this.success$.next(false);
      this.accountService.withdraw({amount: this.amount, email}).subscribe(res => {
        this.loading$.next(false);
        if (res.error) {
          this.error$.next(res.error);
        } else {
          this.success$.next(true);
        }
      });
    }
  }

  setEmail($event) {
    console.log($event);
  }

  private setString(value: number) {
    this.amountString$.next(`Withdraw ${value} Nanrs for $${((value - 1) * .2).toFixed(2)}`);
  }


}
