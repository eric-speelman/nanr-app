import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nanr-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchaseComponent {

  constructor(private router: Router) { }

  purchased() {
    const { redirect } = window.history.state;
    if (!redirect) {
      this.router.navigate(['account']);
    } else {
      this.router.navigate([redirect]);
    }
  }
}
