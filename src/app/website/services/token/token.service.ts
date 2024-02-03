import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import  {jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor() { }

  saveToken(token: string) {
    setCookie('accessTokenBusiness', token, { expires: 365, path: '/' });
  }
  saveRefreshToken(token: string) {
    setCookie('refreshTokenBusiness', token, { expires: 365, path: '/' });
  }
  getToken() {
    const token = getCookie('accessTokenBusiness');
    return token;
  }
  saveTokenExpire(expire: string) {
    // Obtener la hora actual
    var fechaActualMod = new Date();

    var expirevalue = parseFloat(expire);
    // Sumar una hora (3600 segundos)
    fechaActualMod.setSeconds(fechaActualMod.getSeconds() + expirevalue);
    setCookie('expiresAccessTokenBusiness', fechaActualMod.getTime());
  }
  isValidToken(){
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      console.log(tokenDate);
      console.log(today);
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
