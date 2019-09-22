import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy,ChangeDetectorRef } from '@angular/core';
import { AccountService, ProfileModel } from 'src/app/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfilePicComponent } from 'src/app/portable/shared/profile-pic/profile-pic.component';
import { environment } from 'src/environments/environment';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'nanr-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('profilePicture', {static: false}) profilePicture: ProfilePicComponent;
  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  taglineForm = this.fb.group({
    tagline: ['', [Validators.max(125)]]
  });

  bioForm = this.fb.group({
    bio: ['', [Validators.max(500)]]
  });

  textForm = this.fb.group({
    darkText: [true]
  });
  passwordForm = this.fb.group({
    password: [''],
    newPassword: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(32)]],
    confirmPassword: ['']
  });

  profile: ProfileModel;
  standImage$ = new BehaviorSubject<string>(null);
  standCounter = 0;
  isDeleteStandLoading$ = new BehaviorSubject(false);
  isEditingEmail$ = new BehaviorSubject(false);
  isEmailLoading$ = new BehaviorSubject(false);
  isEmailSubmitted$ = new BehaviorSubject(false);
  emailServerError$ = new BehaviorSubject<string>(null);
  isEditingTagline$ = new BehaviorSubject(false);
  isTaglineLoading$ = new BehaviorSubject(false);
  isTaglineSubmitted$ = new BehaviorSubject(false);
  isEditingBio$ = new BehaviorSubject(false);
  isBioLoading$ = new BehaviorSubject(false);
  isBioSubmitted$ = new BehaviorSubject(false);
  isPasswordLoading$ = new BehaviorSubject(false);
  isPasswordSubmitted$ = new BehaviorSubject(false);
  passwordServerError$ = new BehaviorSubject<string>(null);
  passwordsMatch$ = new BehaviorSubject(true);
  passwordSuccess$ = new BehaviorSubject(false);
  logoutLoading$ = new BehaviorSubject(false);
  profilePictureError$ = new BehaviorSubject<string>(null);
  standPictureError$ = new BehaviorSubject<string>(null);
  profileSub: Subscription;
  textFormSub: Subscription;
  constructor(private accountService: AccountService, private fb: FormBuilder, private cd: ChangeDetectorRef,
              private router: Router) { }

  ngOnInit() {
    this.profileSub = this.accountService.profile().subscribe(x => {
      this.profile = x;
      this.emailForm.controls.email.setValue(x.email);
      this.taglineForm.controls.tagline.setValue(x.tagline);
      this.bioForm.controls.bio.setValue(x.bio);
      this.standImage$.next(`url('${environment.apiUrl}account/stand-pic/${x.id}?placeholder=true&cb=${this.standCounter}')`);
      this.textForm.controls.darkText.setValue(this.profile.darkText);
      this.textFormSub = this.textForm.valueChanges.subscribe(val => {
        this.accountService.updateProfile({darkText: val.darkText}).subscribe();
      });
      this.cd.markForCheck();
    });
    this.emailForm.controls.email.disable();
    this.taglineForm.controls.tagline.disable();
    this.bioForm.controls.bio.disable();
  }

  editEmail() {
    this.isEditingEmail$.next(true);
    this.emailForm.controls.email.enable();
  }

  editTagline() {
    this.isEditingTagline$.next(true);
    this.taglineForm.controls.tagline.enable();
  }

  editBio() {
    this.isEditingBio$.next(true);
    this.bioForm.controls.bio.enable();
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

  saveTagline() {
    this.isTaglineSubmitted$.next(true);
    this.isTaglineLoading$.next(true);
    if (this.taglineForm.valid) {
      this.accountService.updateProfile({tagline: this.taglineForm.value.tagline}).subscribe(x => {
        this.isTaglineLoading$.next(false);
        this.isTaglineSubmitted$.next(false);
        this.isEditingTagline$.next(false);
        this.taglineForm.controls.tagline.disable();
      });
    }
  }

  saveBio() {
    this.isBioSubmitted$.next(true);
    this.isBioLoading$.next(true);
    if (this.bioForm.valid) {
      this.accountService.updateProfile({bio: this.bioForm.value.bio}).subscribe(x => {
        this.isBioLoading$.next(false);
        this.isBioSubmitted$.next(false);
        this.isEditingBio$.next(false);
        this.bioForm.controls.bio.disable();
      });
    }
  }

  refillChange($event: any) {
    this.accountService.updateProfile({autoRefill: $event.checked}).subscribe();
  }

  backgroundColorChange($event: ColorEvent) {
    this.accountService.updateProfile({backgroundColor: $event.color.hex}).subscribe();
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
    this.textFormSub.unsubscribe();
  }

  profilePicUpload(file: File) {
    const extensions = ['svg', 'png', 'jpg', 'jpeg'];
    if (file.size > 1073741824) {
      this.profilePictureError$.next('File is too large');
      return;
    }
    const fileParts = file.name.split('.');
    const extension = fileParts[fileParts.length - 1].toLowerCase().trim();
    if (extensions.indexOf(extension) < 0) {
      this.profilePictureError$.next('Picture must be png, jpg or svg');
      return;
    }
    this.profilePictureError$.next(null);
    this.accountService.uploadProfilePic(file).subscribe(() => this.profilePicture.refresh());
  }

  standPicUpload(file: File) {
    const extensions = ['svg', 'png', 'jpg', 'jpeg'];
    if (file.size > 1073741824 * 4) {
      this.standPictureError$.next('File is too large');
      return;
    }
    const fileParts = file.name.split('.');
    const extension = fileParts[fileParts.length - 1].toLowerCase().trim();
    if (extensions.indexOf(extension) < 0) {
      this.standPictureError$.next('Picture must be png, jpg or svg');
      return;
    }
    this.standPictureError$.next(null);
    this.accountService.uploadStandPic(file).subscribe(() => {
      this.standCounter++;
      this.standImage$.next(`url('${environment.apiUrl}account/stand-pic/${this.profile.id}?placeholder=true&cb=${this.standCounter}')`);
    });
  }

  deleteStandBackground() {
    this.isDeleteStandLoading$.next(true);
    this.accountService.deleteStandBackground().subscribe(() => {
      this.isDeleteStandLoading$.next(false);
      this.standCounter++;
      this.standImage$.next(`url('${environment.apiUrl}account/stand-pic/${this.profile.id}?placeholder=true&cb=${this.standCounter}')`);
    });
  }

}

