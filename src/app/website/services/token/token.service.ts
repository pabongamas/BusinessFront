import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {JwtPayloadBusiness} from '../../models/Jwt.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor() { }
  userRoles:number[]=[];

  saveToken(token: string) {
    setCookie('accessTokenBusiness', token, { expires: 365, path: '/' });
  }
  saveRefreshToken(token: string) {
    setCookie('refreshTokenBusiness', token, { expires: 365, path: '/' });
  }
  getToken(): string {
    const token = getCookie('accessTokenBusiness');
    if (token === undefined) {
      // Manejar el caso en que getCookie devuelva undefined,
      // por ejemplo, lanzar un error o devolver una cadena por defecto.
      throw new Error('El token no está disponible');
    }
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
  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
  setUserRoles(roles: number[]): void {
    this.userRoles = roles;
  }
  getUserRoles(){
    const token = this.getToken();
    const decodeToken = jwtDecode<JwtPayloadBusiness>(token);
    console.log(decodeToken.rols);
    this.userRoles=decodeToken.rols??[];
    return this.userRoles;
  }
  hasRole(roleId: number): boolean {
    return this.userRoles.includes(roleId);
  }
}
