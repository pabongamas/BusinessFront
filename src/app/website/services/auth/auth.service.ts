import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService:TokenService
  ) { }
  API_URL = environment.domainBack;
  login(email: string, password: string) {
    return this.http.post<any>(`${this.API_URL}/api/v1/auth/login`, {
      email,
      password
    })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.accessToken);
        this.tokenService.saveRefreshToken(response.refreshToken);
      })
    );
  }
}
