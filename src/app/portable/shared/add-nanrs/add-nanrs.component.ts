import { Component, ChangeDetectionStrategy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { PurchaseService } from 'src/app/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

declare var SqPaymentForm;

@Component({
  selector: 'nanr-add-nanrs',
  templateUrl: './add-nanrs.component.html',
  styleUrls: ['./add-nanrs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNanrsComponent implements AfterViewInit {
  @Output() purchased = new EventEmitter();
  paymentForm: any;
  selected$ = new BehaviorSubject('bushel');
  loading$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject(false);
  built$ = new BehaviorSubject(false);
  billingForm = this.fb.group({
  });
  constructor(private purchaseService: PurchaseService, private fb: FormBuilder) {
  }
  ngAfterViewInit() {
    if (typeof SqPaymentForm === 'undefined') {
      setTimeout(this.ngAfterViewInit, 100);
      return;
    }
    this.paymentForm = new SqPaymentForm({
      applicationId: 'sandbox-sq0idb-1JUoOnGGfhxgP3ukD_d5uA',
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
          this.purchaseService.purchase({amount: this.selected$.value, token: nonce}).subscribe(res => {
            this.loading$.next(false);
            if (res.success) {
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

  onGetCardNonce(event) {
    this.loading$.next(true);
    this.error$.next(false);
    this.paymentForm.requestCardNonce();
  }

  select(type: string) {
    this.selected$.next(type);
  }
}
