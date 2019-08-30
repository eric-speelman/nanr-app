import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nanr-portable-frame',
  templateUrl: './portable-frame.component.html',
  styleUrls: ['./portable-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortableFrameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  close() {
    const msg = {
      type: 'close'
    };
    this.sendMessage(msg);
  }

  private sendMessage(message: {type: string}) {
    window.parent.postMessage(JSON.stringify(message), '*');
  }

}
