import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { userAdminModel } from './../modules/users/models/userAdmin.model';
import { DataSourceUserAdmin } from './../modules/users/pages/user-admin/dataSourceUserAdmin';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dataUser = new BehaviorSubject<userAdminModel[]>([]);
  public dataUser$ = this.dataUser.asObservable();
  
  private fetchUser = new BehaviorSubject<boolean>(false);
  public fetchUser$ = this.fetchUser.asObservable();

  setFetchUsers(find: boolean,) {
    this.fetchUser.next(find);
  }

  constructor(private http: HttpClient) {}
  API_URL = environment.domainBack;

  search(search: string, typesSearch: string[]) {
    const types = typesSearch.join(',');
    var params = '?q=' + search;
    if (types) {
      params += '&type=' + types;
    }
    return this.http.get<userAdminModel[]>(`${this.API_URL}/api/v1/users`);
  }
  create(email: string, password: string) {
    return this.http.post(`${this.API_URL}/api/v1/users`, {
      email,
      password,
    });
  }
  update(id: string, email: string) {
    return this.http.patch(`${this.API_URL}/api/v1/users/${id}`, {
      email,
    });
  }
  delete(id: string) {
    return this.http.delete(`${this.API_URL}/api/v1/users/${id}`);
  }
}
