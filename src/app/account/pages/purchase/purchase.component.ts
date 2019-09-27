import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core';
import { BehaviorSubject } from 'rxjs';
declare var ga;
@Component({
  selector: 'nanr-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchaseComponent implements OnInit {
  purchased$ = new BehaviorSubject(false);
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  purchased() {
    this.purchased$.next(true);
  }

}
