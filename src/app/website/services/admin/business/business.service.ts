import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {
  businessAdminModel,
  CreateAdminBusinessDTO,
  UpdateBusinessDTO,
} from '../../../modules/business/models/businessAdmin.model';
import { DataSourceBusinessAdmin } from '../../../modules/business/pages/business-admin/dataSourceBusinessAdmin';
import { environment } from '../../../../../environments/environment';
import { checkToken } from 'src/app/website/interceptors/token-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private dataBusiness = new BehaviorSubject<businessAdminModel[]>([]);
  public dataBusiness$ = this.dataBusiness.asObservable();

  private fetchBusiness = new BehaviorSubject<boolean>(false);
  public fetchBusiness$ = this.fetchBusiness.asObservable();

  setdataBusiness(data: businessAdminModel[]) {
    this.dataBusiness.next(data);
  }

  setfetchBusiness(find: boolean) {
    this.fetchBusiness.next(find);
  }

  constructor(private http: HttpClient) {}
  API_URL = environment.domainBack;

  search(search: string, typesSearch: string[]) {
    const types = typesSearch.join(',');
    var params = '?q=' + search;
    if (types) {
      params += '&type=' + types;
    }
    return this.http.get<businessAdminModel[]>(`${this.API_URL}/api/v1/business`, {
      context: checkToken(),
    });
  }
  searchByUser(search: string, typesSearch: string[]) {
    const types = typesSearch.join(',');
    var params = '?q=' + search;
    if (types) {
      params += '&type=' + types;
    }
    return this.http.get<businessAdminModel[]>(`${this.API_URL}/api/v1/business/byUser`, {
      context: checkToken(),
    });
  }
  create(data: CreateAdminBusinessDTO) {
    return this.http.post(`${this.API_URL}/api/v1/business`, data);
  }
  update(id: string, data: UpdateBusinessDTO) {
    return this.http.patch(`${this.API_URL}/api/v1/business/${id}`, data);
  }
  delete(id: string) {
    return this.http.delete(`${this.API_URL}/api/v1/business/${id}`);
  }
  searchBusiness(data: string) {
    var params = '?search=' + data;
    return this.http.get<businessAdminModel[]>(
      `${this.API_URL}/api/v1/business/searchBusiness${params}`
    );
  }
  businessByUser(id:string) {
    return this.http.post<businessAdminModel[]>(`${this.API_URL}/api/v1/business/businessByUser`, {id});
  }
  deleteBusinessRolByUser(userId:string,rolId:number|undefined,businessId:string) {
    return this.http.post(`${this.API_URL}/api/v1/business/deleteBusinessRolByUser`, {userId,rolId,businessId});
  }
}
