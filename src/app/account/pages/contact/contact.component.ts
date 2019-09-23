import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContactService } from 'src/app/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'nanr-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  contactForm = this.fb.group({
    email: [''],
    message: ['']
  });
  state$ = new BehaviorSubject<number>(1);
  constructor(private fb: FormBuilder, private contactService: ContactService) { }

  send() {
    this.state$.next(2);
    this.contactService.send(this.contactForm.value).subscribe(() => {
      this.state$.next(3);
    });
  }

}
