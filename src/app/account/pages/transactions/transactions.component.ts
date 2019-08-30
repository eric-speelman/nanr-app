import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TransactionsService, TransactionResponseModel } from 'src/app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'nanr-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<TransactionResponseModel>;
  constructor(private transactions: TransactionsService) { }

  ngOnInit() {
    this.transactions$ = this.transactions.get();
  }

  formatTimeStamp(dt: string) {
    return new Date(dt).toLocaleDateString();
  }

  formatStatus(status: number) {
    if (status === 1) {
      return 'Pending';
    }
  }

}
