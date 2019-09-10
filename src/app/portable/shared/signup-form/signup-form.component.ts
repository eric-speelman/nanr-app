import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'nanr-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent {
  @Output() signedup = new EventEmitter();
  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern(/^[a-z0-9_-]+$/i)]],
    password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(32)]],
    confirmPassword: [''],
    tos: [false, [Validators.requiredTrue]]
  });
  loading$ = new BehaviorSubject(false);
  submitted$ = new BehaviorSubject(false);
  passwordMatch$ = new BehaviorSubject(true);
  serverErrors$ = new BehaviorSubject({email: null, username: null});
  constructor(private fb: FormBuilder, private auth: AuthService) { }

  signup() {
    console.log(this.signupForm.value)
    this.serverErrors$.next({email: null, username: null});
    this.submitted$.next(true);
    this.passwordMatch$.next(this.signupForm.controls.password.value === this.signupForm.controls.confirmPassword.value === true);
    if (this.passwordMatch$.value && this.signupForm.valid) {
      this.loading$.next(true);
      this.auth.signup(this.signupForm.value).subscribe(res => {
        this.loading$.next(false);
        if (res.success) {
          window.localStorage.setItem('session', res.session.id);
          this.signedup.next();
        } else {
          this.serverErrors$.next({email: res.errors.email, username: res.errors.username});
        }
      });
    }
  }
}
