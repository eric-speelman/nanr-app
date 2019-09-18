import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TransactionsService, HomeSummaryModel } from 'src/app/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';


@Component({
  selector: 'nanr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  summary$: Observable<HomeSummaryModel>;
  constructor(private transactionService: TransactionsService, private dialog: MatDialog, private router: Router) {
    this.summary$ = this.transactionService.homeSummary();
  }

  ngOnInit() {
    if (window.history.state.isSignup) {
      this.dialog.open(WelcomeDialogComponent);
    }
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

  add() {
    this.router.navigateByUrl('/account/purchase');
  }

  withdraw() {
    this.router.navigateByUrl('/account/withdraw');
  }

}
