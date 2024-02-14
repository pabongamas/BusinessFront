import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { checkToken } from 'src/app/website/interceptors/token-interceptor.service';
import { clientAdminModel } from 'src/app/website/modules/clients/models/clientAdmin.model';
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

  constructor(private http: HttpClient) {}
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
}
