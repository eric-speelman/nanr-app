import { Component } from '@angular/core';
declare var ga;
@Component({
  selector: 'nanr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    ga('create', 'UA-148453051-1', 'auto');
  }
}
