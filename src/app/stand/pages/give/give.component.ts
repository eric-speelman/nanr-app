import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AccountService, ClickService, StandModel, UserModel, NanrCountService } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'nanr-give',
  templateUrl: './give.component.html',
  styleUrls: ['./give.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiveComponent implements OnInit, OnDestroy {
  size: number;
  username$: Observable<string>;
  stand$: Observable<StandModel>;
  state$ = new BehaviorSubject('default');
  nanrs$: Observable<{value: number}>;
  buttonUrl$ = new BehaviorSubject<SafeResourceUrl>(undefined);
  eventFunc: any;
  constructor(private sanitizer: DomSanitizer, private router: Router,
              private route: ActivatedRoute, private clickService: ClickService,
              private accountService: AccountService, private nanrCount: NanrCountService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        let username = params.get('username');
        if (username) {
          username = username.substr(0, 1).toUpperCase() + username.substr(1).toLowerCase();
          this.stand$ = this.accountService.getStand(username);
        }
        this.buttonUrl$.next(
          this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.buttonUrl}?tagId=${username}&page=${window.location.href}`));
        return username;
      });
    this.nanrs$ = this.nanrCount.getCount().pipe(
      map(value => ({value}))
    );
    const me = this;
    this.eventFunc = message => {
      me.handleMessage(message, me);
    };
    window.addEventListener('message', this.eventFunc, false);
    this.size = Math.min(window.innerHeight - 110, window.innerWidth - 110, 300);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.eventFunc);
  }

  getBackground(id: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${environment.apiUrl}account/stand-pic/${id}')`);
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
            this.router.navigateByUrl('s/ap/purchase', {state: {redirect: this.router.url}});
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
          me.router.navigateByUrl('s/ap/purchase', {state: {redirect: this.router.url}});
        } else if (msgObj.type === 'nanr') {
          me.nanrCount.minus();
        } else if (msgObj.type === 'balance') {
          if (this.nanrCount.count <= 0) {
            this.nanrCount.setCount(msgObj.balance);
          }
        }
      }
    }
  }
  get() {
    this.router.navigate(['s/ap/purchase']);
  }
}
