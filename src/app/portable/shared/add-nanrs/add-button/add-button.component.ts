import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'nanr-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddButtonComponent implements OnChanges {
  @Input() name: string;
  @Input() amount: number;
  @Input() price: string;
  @Input() img: string;
  @Input() selected = false;
  classes: string[] = [];

  ngOnChanges() {
    if (this.selected) {
      this.classes = ['button-container', 'selected'];
    } else {
      this.classes = ['button-container'];
    }
  }

}
