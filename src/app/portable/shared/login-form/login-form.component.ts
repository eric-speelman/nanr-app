import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService, SessionModel } from 'src/app/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'nanr-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });
  isLoading$ = new BehaviorSubject(false);
  hasError$ = new BehaviorSubject(false);
  @Output() loggedIn = new EventEmitter<SessionModel>();
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
  }

  login() {
    this.hasError$.next(false);
    this.isLoading$.next(true);
    this.auth.login(this.loginForm.value).subscribe(res => {
      window.localStorage.setItem('session', res.id);
      this.isLoading$.next(false);
      if (res.user.balance <= 0) {
        this.router.navigate(['portable/add']);
      } else {
        this.loggedIn.next(res);
      }
    },
    () => {
      this.hasError$.next(true);
      this.isLoading$.next(false);
    });
  }
}
