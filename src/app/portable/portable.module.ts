import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { PortableRoutingModule } from './portable-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { AddComponent } from './pages/add/add.component';
import { AddButtonComponent } from './shared/add-nanrs/add-button/add-button.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PortableFrameComponent } from './shared/portable-frame/portable-frame.component';
import { SignupFormComponent } from './shared/signup-form/signup-form.component';
import { LoginFormComponent } from './shared/login-form/login-form.component';
import { AddNanrsComponent } from './shared/add-nanrs/add-nanrs.component';
import { ProfilePicComponent } from './shared/profile-pic/profile-pic.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    LoginComponent,
    AddComponent,
    AddButtonComponent,
    SignupComponent,
    PortableFrameComponent,
    SignupFormComponent,
    LoginFormComponent,
    AddNanrsComponent,
    ProfilePicComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PortableRoutingModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSlideToggleModule
  ],
  exports: [SignupFormComponent, LoginFormComponent, AddNanrsComponent, ProfilePicComponent]
})
export class PortableModule {
  constructor() {
  }
}
