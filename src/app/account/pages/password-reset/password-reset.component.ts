import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'nanr-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  resetForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(32)]],
    confirmPassword: ['']
  });
  submitted$ = new BehaviorSubject(false);
  passwordMatch$ = new BehaviorSubject(true);
  loading$ = new BehaviorSubject(false);
  success$ = new BehaviorSubject(false);
  sub: Subscription;
  token: string;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private auth: AuthService) { }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.token = params.token;
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  reset() {
    this.submitted$.next(true);
    this.passwordMatch$.next(this.resetForm.controls.password.value === this.resetForm.controls.confirmPassword.value === true);
    if (this.passwordMatch$.value && this.resetForm.valid) {
      this.loading$.next(true);
      this.auth.resetPasswordSet({token: this.token, password: this.resetForm.value.password}).subscribe(() => {
        this.success$.next(true);
      });
    }
  }
}
