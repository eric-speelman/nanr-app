import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TransactionsService, HomeSummaryModel } from 'src/app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'nanr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  summary$: Observable<HomeSummaryModel>;
  constructor(private transactionService: TransactionsService) {
    this.summary$ = this.transactionService.homeSummary();
  }

  getStatusImg(count: number) {
    let img: string;
    if (count <= 5) {
      img = 'low.svg';
    } else if (count < 20) {
      img = 'mid.svg';
    } else {
      img = 'high.svg';
    }

    return `/assets/img/status/${img}`;
  }

}
