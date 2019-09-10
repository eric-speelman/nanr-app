import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, UserModel} from 'src/app/core';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'nanr-app-frame',
  templateUrl: './app-frame.component.html',
  styleUrls: ['./app-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFrameComponent {
  @ViewChild('sidenav', {static: true}) sideNav: MatSidenav;
  @Input() selected: string;
  user$: Observable<UserModel>;
  opened = window.innerWidth > 840;
  constructor(private router: Router, private accountService: AccountService) {
    this.user$ = this.accountService.get();
  }
  nav(path: string) {
    this.router.navigate(['account/' + path]);
  }

  get() {
    this.router.navigate(['account/purchase']);
  }

  toggleNav() {

  }

}
