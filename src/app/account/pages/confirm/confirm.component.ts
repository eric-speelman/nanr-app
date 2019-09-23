import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from 'src/app/core';

@Component({
  selector: 'nanr-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmComponent implements OnInit {
  loading$ = new BehaviorSubject(true);
  success$ = new BehaviorSubject(true);
  constructor(private activeRoute: ActivatedRoute, private accountService: AccountService) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (!params.code) {
        this.loading$.next(false);
        this.success$.next(false);
      } else {
        this.accountService.confirmEmail(params.code).subscribe(result => {
          this.loading$.next(false);
          this.success$.next(result);
        });
      }
    });
  }

}
