import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { PortableFrameComponent } from '../../shared/portable-frame/portable-frame.component';

@Component({
  selector: 'nanr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @ViewChild('frame', {static: true}) frame: PortableFrameComponent;

  close() {
    this.frame.close();
  }
}
