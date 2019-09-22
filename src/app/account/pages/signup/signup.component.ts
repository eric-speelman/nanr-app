import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
declare var ga;
@Component({
  selector: 'nanr-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  redirect: string;
  constructor(private router: Router) {
    this.redirect = window.history.state.redirect;
    ga('send', 'event', 'PDF', 'Download', 'Company Brochure – PDF Download');
  }

  signedup() {
    if (this.redirect && this.redirect.indexOf('s/') >= 0) {
      this.router.navigateByUrl('s/ap/purchase', {state: {redirect: this.redirect}});
    } else {
      this.router.navigateByUrl('', {state: {isSignup: true}});
    }
  }

  login() {
    this.router.navigateByUrl('account/login', {state: {redirect: this.redirect}});
  }
}
