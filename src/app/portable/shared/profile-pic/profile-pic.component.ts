import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'nanr-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePicComponent implements OnInit {
  @Input() username: string;
  url$ = new BehaviorSubject<string>(null);
  counter = 0;
  constructor() { }

  ngOnInit() {
    this.url$.next(environment.apiUrl + 'account/profile-pic/' + this.username + '?' + this.counter);
  }

  refresh() {
    this.counter++;
    this.url$.next(environment.apiUrl + 'account/profile-pic/' + this.username + '?' + this.counter);
  }

}
