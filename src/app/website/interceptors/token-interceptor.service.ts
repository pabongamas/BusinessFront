import { HttpContext, HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token/token.service';
import { Router } from '@angular/router';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);


export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService,
    private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.context.get(CHECK_TOKEN)) {
      return this.addToken(req, next);
    }
    return next.handle(req);
  }
  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    if (accessToken) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
      });
      return next.handle(authRequest);
    } else {
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
  
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
  
          return throwError(() => err);
  
        })
      );
    }
  }
}
