import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, UserModel} from 'src/app/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'nanr-app-frame',
  templateUrl: './app-frame.component.html',
  styleUrls: ['./app-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFrameComponent implements OnInit {
  @Input() selected: string;
  user$: Observable<UserModel>;
  opened$ = new BehaviorSubject(false)
  constructor(private router: Router, private accountService: AccountService) {
    this.user$ = this.accountService.get();
  }

  ngOnInit() {
    if (window.innerWidth > 840) {
      this.opened$.next(true);
    }
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
