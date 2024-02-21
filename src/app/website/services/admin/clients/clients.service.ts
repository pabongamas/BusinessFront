import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { checkToken } from 'src/app/website/interceptors/token-interceptor.service';
import { clientAdminFormModel, clientAdminModel } from 'src/app/website/modules/clients/models/clientAdmin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private dataClient = new BehaviorSubject<clientAdminModel[]>([]);
  public dataClient$ = this.dataClient.asObservable();

  private fetchClient = new BehaviorSubject<boolean>(false);
  public fetchClient$ = this.fetchClient.asObservable();

  setdataClient(data: clientAdminModel[]) {
    this.dataClient.next(data);
  }

  setFetchClient(find: boolean) {
    this.fetchClient.next(find);
  }

  constructor(private http: HttpClient) { }
  API_URL = environment.domainBack;

  search(search: string, typesSearch: string[]) {
    const types = typesSearch.join(',');
    var params = '?q=' + search;
    if (types) {
      params += '&type=' + types;
    }
    return this.http.get<clientAdminModel[]>(`${this.API_URL}/api/v1/clients/business`, {
      context: checkToken(),
    });
  }
  searchClient(data: string) {
    var params = '?search=' + data;
    return this.http.get<clientAdminModel[]>(
      `${this.API_URL}/api/v1/clients/business/searchClient${params}`, {
      context: checkToken(),
    }
    );
  }

  createClient(data: clientAdminFormModel) {
    return this.http.post(`${this.API_URL}/api/v1/clients/save`, data, {
      context: checkToken(),
    });
  }
  updateClient(id: string, data: clientAdminFormModel) {
    return this.http.patch(`${this.API_URL}/api/v1/clients/update/${id}`, data, {
      context: checkToken()
    });
  }
}
