import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TagService } from 'src/app/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nanr-integrate',
  templateUrl: './integrate.component.html',
  styleUrls: ['./integrate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntegrateComponent implements OnInit {
  buttonTag$: Observable<string>;
  scriptTag = '<script src="http://localhost:4200/assets/tags/nanr.js"></script>'
  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.buttonTag$ = this.tagService.get().pipe(
      map(x => `<div nanr-id="${x[0].id}"></div>`)
    );
  }

}
