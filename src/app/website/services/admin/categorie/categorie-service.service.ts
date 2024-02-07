import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { categorieAdminModel } from 'src/app/website/modules/categories/models/CategoriesAdmin.model';
import { environment } from 'src/environments/environment';

import {
  CreateAdminCategorieDTO,UpdateCategorieDTO
} from '../../../modules/categories/models/CategoriesAdmin.model';
import { checkToken } from 'src/app/website/interceptors/token-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieServiceService {
  private dataCategorie = new BehaviorSubject<categorieAdminModel[]>([]);
  public dataCategorie$ = this.dataCategorie.asObservable();

  private fetchCategorie = new BehaviorSubject<boolean>(false);
  public fetchCategorie$ = this.fetchCategorie.asObservable();

  setdataCategorie(data: categorieAdminModel[]) {
    this.dataCategorie.next(data);
  }

  setFetchCategorie(find: boolean) {
    this.fetchCategorie.next(find);
  }

  constructor(private http: HttpClient) {}
  API_URL = environment.domainBack;

  search(search: string, typesSearch: string[]) {
    const types = typesSearch.join(',');
    var params = '?q=' + search;
    if (types) {
      params += '&type=' + types;
    }
    return this.http.get<categorieAdminModel[]>(`${this.API_URL}/api/v1/categories`, {
      context: checkToken(),
    });
  }
  searchCategorie(data: string) {
    var params = '?search=' + data;
    return this.http.get<categorieAdminModel[]>(
      `${this.API_URL}/api/v1/categories/searchCategorie${params}`, {
        context: checkToken(),
      }
    );
  }

  create(data: CreateAdminCategorieDTO) {
    return this.http.post(`${this.API_URL}/api/v1/categories`, data, {
      context: checkToken(),
    });
  }

  update(id: number, categorie: UpdateCategorieDTO) {
    return this.http.patch(`${this.API_URL}/api/v1/categories/${id}`, categorie, {
      context: checkToken(),
    });
  }
  delete(id: number) {
    return this.http.delete(`${this.API_URL}/api/v1/categories/${id}`, {
      context: checkToken(),
    });
  }

}
