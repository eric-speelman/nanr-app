import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService, ClickService } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'nanr-give',
  templateUrl: './give.component.html',
  styleUrls: ['./give.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiveComponent implements OnInit {
  username$: Observable<string>;
  state$ = new BehaviorSubject('default');
  buttonUrl$ = new BehaviorSubject<SafeResourceUrl>(undefined);
  constructor(private sanitizer: DomSanitizer, private router: Router,
              private route: ActivatedRoute, private clickService: ClickService) { }

  ngOnInit() {
    this.username$ = this.route.paramMap.pipe(
      map(params => {
        let username = params.get('username');
        if (username) {
          username = username.substr(0, 1).toUpperCase() + username.substr(1).toLowerCase();
        }
        console.log(`${environment.buttonUrl}?tagId=${username}`)
        this.buttonUrl$.next(
          this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.buttonUrl}?tagId=${username}&page=${window.location.href}`));
        return username;
      })
    );
    const me = this;
    window.addEventListener('message', message => {
      me.handleMessage(message, me);
    }, false);
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

  handleMessage(message: any, me: any) {
    if (message && message.data) {
      let msgObj: any;
      try {
        msgObj = JSON.parse(message.data);
      } catch (err)
      {
        return;
      }
      if (msgObj) {
          if (msgObj && msgObj.type === 'showLogin') {
            me.router.navigateByUrl('account/signup', {state: {redirect: this.router.url}});
          } else if (msgObj.type === 'addFunds') {
            console.log(this.router)
            me.router.navigateByUrl('s/ap/purchase', {state: {redirect: this.router.url}});
          }
      }
    }
  }
}
