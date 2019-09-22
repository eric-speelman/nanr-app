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
  constructor(private router: Router) {

  }

  signedup() {
    ga('send', 'event', 'account', 'signup', 'portable');
    this.router.navigate(['portable/add']);
  }

  login() {
    this.router.navigateByUrl('portable/login');
  }
}
