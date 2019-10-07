import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const session = window.localStorage.getItem('session');
    if (!session) {
      const url = state.url;
      this.router.navigateByUrl('account/signup', {state: {redirect: url }});
      return false;
    }
    return true;
  }
}
