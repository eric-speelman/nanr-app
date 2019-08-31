import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TagService, TagResponseModel } from 'src/app/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'nanr-integrate',
  templateUrl: './integrate.component.html',
  styleUrls: ['./integrate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntegrateComponent implements OnInit {
  tag$: Observable<TagResponseModel>;
  scriptTag = '<script src="https://app.nanr.io/assets/tags/nanr.js"></script>';
  nanrStandUrl$ = new Subject<string>();
  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tag$ = this.tagService.get();
  }

  generateButtonTag(id: string) {
    return `<div nanr-id="${id}"></div>`;
  }

  generateStandLink(username: string) {
    return `${environment.nanrStandUrl}${username.toLowerCase()}`;
  }

}
