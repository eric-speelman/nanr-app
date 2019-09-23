import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
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
  resetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  isLoading$ = new BehaviorSubject(false);
  hasError$ = new BehaviorSubject(false);
  resetComplete$ = new BehaviorSubject(false);
  isResetting$ = new BehaviorSubject(false);
  resetSubmitted$ = new BehaviorSubject(false);
  @Output() loggedIn = new EventEmitter<SessionModel>();
  @Output() signup = new EventEmitter();
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

  signupClick() {
    this.signup.next();
  }

  resetStart() {
    this.isResetting$.next(true);
  }

  reset() {
    this.resetSubmitted$.next(true);
    if (this.resetForm.valid) {
      this.auth.resetPassword(this.resetForm.value.email).subscribe(() => {
        this.resetComplete$.next(true);
      });
      this.isLoading$.next(true);
    }
  }
}
