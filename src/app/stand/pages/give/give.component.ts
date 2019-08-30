import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService, ClickService } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'nanr-give',
  templateUrl: './give.component.html',
  styleUrls: ['./give.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiveComponent implements OnInit {
  username$: Observable<string>;
  state$ = new BehaviorSubject('default');
  constructor(private auth: AuthService, private router: Router,
              private route: ActivatedRoute, private clickService: ClickService) { }

  ngOnInit() {
    this.username$ = this.route.paramMap.pipe(
      map(params => {
        let username = params.get('username');
        if (username) {
          username = username.substr(0, 1).toUpperCase() + username.substr(1).toLowerCase();
        }
        return username;
      })
    );
  }

  send() {
    if (!window.localStorage.getItem('session')) {
      this.router.navigateByUrl('account/signup', {state: {redirect: this.router.url}});
    } else {
      this.state$.next('loading');
      this.username$.pipe(
        switchMap(username => this.clickService.sendClick(username))
      ).subscribe(res => {
        if (!res.success) {
          const errors = res.errors.map(x => x.toLowerCase());
          if (errors.filter(x => x.indexOf('funds') >= 0).length >= 1) {
            this.router.navigateByUrl('s/app/purchase', {state: {redirect: this.router.url}});
          }
        } else {
          this.state$.next('success');
          setTimeout(() => this.state$.next('default'), 2000);
        }
      });
    }
  }
}
