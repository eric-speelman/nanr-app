import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, UserModel} from 'src/app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'nanr-app-frame',
  templateUrl: './app-frame.component.html',
  styleUrls: ['./app-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFrameComponent implements OnInit {
  @Input() selected: string;
  user$: Observable<UserModel>;
  constructor(private router: Router, private accountService: AccountService) {
    this.user$ = this.accountService.get();
  }

  ngOnInit() {
  }

  nav(path: string) {
    this.router.navigate(['account/' + path]);
  }

  get() {
    this.router.navigate(['account/purchase']);
  }

}
