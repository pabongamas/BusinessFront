import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor() { }

  saveToken(token: string) {
    setCookie('accessTokenBusiness', token, { expires: 365, path: '/' });
  }
  getToken() {
    const token = getCookie('accessTokenBusiness');
    return token;
  }
  isValidToken(){
    return false;
  }
}
