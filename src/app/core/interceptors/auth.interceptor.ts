import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.endsWith('api/login')) {
      return next.handle(req);
    }
    const sessionId = window.localStorage.getItem('session');
    const isPortable = this.router.url.indexOf('portable') >= 0;
    if (!sessionId) {
      if (isPortable) {
        this.router.navigate(['portable/signup']);
      } else {
        this.router.navigate(['account/signup']);
      }
    }
    if (sessionId) {
      req = req.clone({setHeaders: {Authorization: 'bearer ' + sessionId}});
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          if (isPortable) {
            this.router.navigate(['portable/signup']);
          } else {
          this.router.navigate(['account/signup']);
          }
        }
        throw err;
      })
    );
  }
}
