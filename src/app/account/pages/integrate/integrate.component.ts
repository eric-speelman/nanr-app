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
    return `<div nanr-id="${id}" nanr-size="54"></div>`;
  }

  generateRequireTag(id: string) {
    return `<script>
    nanr.require({
        username: '${id}',
        pageCnt: <page-count>,
        pageId: '<page-id>',
        title: '<title>',
        text: '<text>',
        background: '<background>'
    });
  </script>`;
  }

  generateCallbackTag() {
    return `<script>
    function nanrEvent({ loggedIn, pageNanrs, totalNanrs, pageId }) {
      //Add logic to integreate into your platform here
    }
    nanr.onNanr(nanrEvent);
  </script>`;
  }

  generateStandLink(username: string) {
    return `${environment.nanrStandUrl}${username.toLowerCase()}`;
  }

}
