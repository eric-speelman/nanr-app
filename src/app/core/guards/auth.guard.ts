import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const session = window.localStorage.getItem('session');
    if (!session) {
      const redirect = this.router.url;
      this.router.navigateByUrl('account/signup', {state: {redirect}});
      return false;
    }
    return true;
  }
}
