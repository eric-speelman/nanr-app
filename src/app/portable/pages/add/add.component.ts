import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { PortableFrameComponent } from '../../shared/portable-frame/portable-frame.component';

@Component({
  selector: 'nanr-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent {
  @ViewChild('frame', {static: true}) frame: PortableFrameComponent;

  close() {
    this.frame.close();
  }
}
