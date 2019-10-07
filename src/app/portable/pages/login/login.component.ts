import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { PortableFrameComponent } from '../../shared/portable-frame/portable-frame.component';
import { Router } from '@angular/router';

@Component({
  selector: 'nanr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @ViewChild('frame', {static: true}) frame: PortableFrameComponent;
  constructor(private router: Router) {}

  close() {
    this.frame.close();
  }

  signup() {
    this.router.navigate(['portable/signup']);
  }
  loggedIn() {
    this.router.navigate(['portable/add']);
  }
}
