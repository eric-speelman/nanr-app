import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SessionModel } from 'src/app/core';

@Component({
  selector: 'nanr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  constructor(private router: Router, private auth: AuthService) { }

  loggedIn() {
    const { redirect } = window.history.state;
    if (redirect) {
        this.router.navigate([redirect]);
    } else {
      this.router.navigate(['account']);
    }
  }

}
