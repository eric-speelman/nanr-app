import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy,ChangeDetectorRef } from '@angular/core';
import { AccountService, ProfileModel } from 'src/app/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'nanr-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  passwordForm = this.fb.group({
    password: [''],
    newPassword: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(32)]],
    confirmPassword: ['']
  });
  profile: ProfileModel;
  isEditingEmail$ = new BehaviorSubject(false);
  isEmailLoading$ = new BehaviorSubject(false);
  isEmailSubmitted$ = new BehaviorSubject(false);
  emailServerError$ = new BehaviorSubject<string>(null);
  isPasswordLoading$ = new BehaviorSubject(false);
  isPasswordSubmitted$ = new BehaviorSubject(false);
  passwordServerError$ = new BehaviorSubject<string>(null);
  passwordsMatch$ = new BehaviorSubject(true);
  passwordSuccess$ = new BehaviorSubject(false);
  logoutLoading$ = new BehaviorSubject(false);
  profileSub: Subscription;
  constructor(private accountService: AccountService, private fb: FormBuilder, private cd: ChangeDetectorRef,
              private router: Router) { }

  ngOnInit() {
    this.profileSub = this.accountService.profile().subscribe(x => {
      this.profile = x;
      this.emailForm.controls.email.setValue(x.email);
      this.cd.markForCheck();
    });
    this.emailForm.controls.email.disable();
  }

  editEmail() {
    this.isEditingEmail$.next(true);
    this.emailForm.controls.email.enable();
  }

  saveEmail() {
    this.isEmailSubmitted$.next(true);
    this.isEmailLoading$.next(true);
    if (this.emailForm.valid) {
      this.accountService.updateProfile({email: this.emailForm.value.email}).subscribe(x => {
        this.isEmailLoading$.next(false);
        if (x[0]) {
          this.emailServerError$.next(x[0]);
        } else {
          this.emailServerError$.next(null);
          this.isEmailSubmitted$.next(false);
          this.isEditingEmail$.next(false);
          this.emailForm.controls.email.disable();
        }
      });
    }
  }

  changePassword() {
    this.isPasswordSubmitted$.next(true);
    this.passwordsMatch$.next(this.passwordForm.controls.newPassword.value === this.passwordForm.controls.confirmPassword.value);
    if (this.passwordsMatch$.value && this.passwordForm.valid) {
      this.isPasswordLoading$.next(true);
      this.accountService.changePassword(this.passwordForm.value).subscribe(x => {
        this.isPasswordLoading$.next(false);
        if (x[0]) {
          this.passwordServerError$.next(x[0]);
        } else {
          this.passwordServerError$.next(null);
          this.isPasswordSubmitted$.next(false);
          this.passwordForm.controls.password.setValue('');
          this.passwordForm.controls.newPassword.setValue('');
          this.passwordForm.controls.confirmPassword.setValue('');
          this.passwordForm.controls.newPassword.setErrors(null);
          this.passwordSuccess$.next(true);
          this.passwordForm.markAsPristine();
          setTimeout(() => this.passwordSuccess$.next(false), 5000 );
        }
      });
    }
  }

  logout() {
    this.logoutLoading$.next(true);
    this.accountService.logout().subscribe(() => {
      this.router.navigateByUrl('account/login');
    });
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe();
  }

}
