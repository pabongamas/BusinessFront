import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }
  API_URL = environment.domainBack;
  login(email: string, password: string) {
    return this.http.post<any>(`${this.API_URL}/api/v1/auth/login`, {
      email,
      password
    })
    .pipe(
      tap(response => {
        // this.tokenService.saveToken(response.access_token);
        // this.tokenService.saveRefreshToken(response.refresh_token);
      })
    );
  }
}
