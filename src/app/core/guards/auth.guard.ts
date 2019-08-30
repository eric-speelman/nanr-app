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
    console.log(session);
    if (!session) {
      this.router.navigate(['account/signup']);
      return false;
    }
    return true;
  }
}
