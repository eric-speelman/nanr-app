import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { PortableFrameComponent } from '../../shared/portable-frame/portable-frame.component';
declare var ga;
@Component({
  selector: 'nanr-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent {
  @ViewChild('frame', {static: true}) frame: PortableFrameComponent;

  close() {
    ga('send', 'event', 'nanr', 'purchase', 'portable');
    this.frame.close();
  }
}
