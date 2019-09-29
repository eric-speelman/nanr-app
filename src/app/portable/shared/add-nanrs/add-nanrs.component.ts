import { Component, ChangeDetectionStrategy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { PurchaseService, AccountService, UserModel, NanrCountService } from 'src/app/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare var SqPaymentForm;

@Component({
  selector: 'nanr-add-nanrs',
  templateUrl: './add-nanrs.component.html',
  styleUrls: ['./add-nanrs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNanrsComponent implements AfterViewInit {
  @Output() purchased = new EventEmitter<number>();
  paymentForm: any;
  user: UserModel;
  nanrAmount: number;
  selected$ = new BehaviorSubject('bushel');
  loading$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject(false);
  built$ = new BehaviorSubject(false);
  useSaved$ = new BehaviorSubject(false);
  me$: Observable<UserModel>;
  billingForm = this.fb.group({
    useSaved: [true],
    saveBilling: [false],
    rebill: [false]
  });
  constructor(private purchaseService: PurchaseService, private fb: FormBuilder,
              private accountService: AccountService, private nanrCount: NanrCountService) {
    this.me$ = this.accountService.get().pipe(
      tap(user => {
        this.billingForm.controls.rebill.setValue(user.refill);
      })
    );
    this.billingForm.controls.useSaved.valueChanges.subscribe(value => {
      if (!value) {
        this.billingForm.controls.rebill.setValue(false);
        this.billingForm.controls.saveBilling.setValue(false);
      }
    });
    this.billingForm.controls.rebill.valueChanges.subscribe(value => {
      if (value) {
        this.billingForm.controls.saveBilling.setValue(true);
      }
    });
  }
  ngAfterViewInit() {

    if (typeof SqPaymentForm === 'undefined') {
      setTimeout(this.ngAfterViewInit, 100);
      return;
    }
    this.paymentForm = new SqPaymentForm({
      applicationId: environment.squareAppId,
      inputClass: 'sq-input',
      autoBuild: false,
      inputStyles: [{
          fontSize: '16px',
          lineHeight: '24px',
          padding: '16px',
          placeholderColor: '#a0a0a0',
          backgroundColor: 'transparent',
      }],
      cardNumber: {
          elementId: 'sq-card-number',
          placeholder: 'Card Number'
      },
      cvv: {
          elementId: 'sq-cvv',
          placeholder: 'CVV'
      },
      expirationDate: {
          elementId: 'sq-expiration-date',
          placeholder: 'MM/YY'
      },
      postalCode: {
          elementId: 'sq-postal-code',
          placeholder: 'Postal'
      },
      // SqPaymentForm callback functions
      callbacks: {
          cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
              // Log errors from nonce generation to the browser developer console.
              console.error('Encountered errors:');
              errors.forEach((error) => {
                  console.error('  ' + error.message);
              });
              this.loading$.next(false);
              return;
          }
          this.purchaseService.purchase({amount: this.selected$.value,
            token: nonce,
            saveBilling: this.billingForm.controls.saveBilling.value}).subscribe(res => {
            this.loading$.next(false);
            if (res.success) {
              this.nanrCount.add(res.nanrs);
              this.purchased.next();
            } else {
              this.error$.next(true);
            }
          });
          }
      }
    });
    this.paymentForm.build();
    this.built$.next(true);
  }

  onGetCardNonce(event, me: UserModel) {
    if (this.billingForm.controls.useSaved.value && me.hasBilling) {
      this.loading$.next(true);
      this.purchaseService.purchase({amount: this.selected$.value, useSaved: true,
        refill: this.billingForm.controls.rebill.value}).subscribe(res => {
        this.loading$.next(false);
        if (res.success) {
          this.nanrCount.add(res.nanrs);
          this.purchased.next(res.nanrs);
        } else {
          this.error$.next(true);
        }
      });
    } else {
      this.loading$.next(true);
      this.error$.next(false);
      this.paymentForm.requestCardNonce();
    }
  }

  select(type: string) {
    this.selected$.next(type);
  }
}
