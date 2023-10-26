import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { rolAdminModel } from '../modules/rols/models/rolAdmin.model';
import { DataSourceUserAdmin } from './../modules/users/pages/user-admin/dataSourceUserAdmin';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RolService {
  private dataRol = new BehaviorSubject<rolAdminModel[]>([]);
  public dataRol$ = this.dataRol.asObservable();

  private fechRol = new BehaviorSubject<boolean>(false);
  public fechRol$ = this.fechRol.asObservable();

  setdataRol(data: rolAdminModel[]) {
    this.dataRol.next(data);
  }

  setfechRols(find: boolean) {
    this.fechRol.next(find);
  }

  constructor(private http: HttpClient) {}
  API_URL = environment.domainBack;

  search(search: string, typesSearch: string[]) {
    const types = typesSearch.join(',');
    var params = '?q=' + search;
    if (types) {
      params += '&type=' + types;
    }
    return this.http.get<rolAdminModel[]>(`${this.API_URL}/api/v1/roles`);
  }
}
