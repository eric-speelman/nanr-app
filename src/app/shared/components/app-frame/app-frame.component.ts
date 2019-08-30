import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nanr-app-frame',
  templateUrl: './app-frame.component.html',
  styleUrls: ['./app-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFrameComponent implements OnInit {
  @Input() selected: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  nav(path: string) {
    this.router.navigate(['account/' + path]);
  }

  get() {
    this.router.navigate(['account/purchase']);
  }

}
