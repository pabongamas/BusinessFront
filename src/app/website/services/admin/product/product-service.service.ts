import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { checkToken } from 'src/app/website/interceptors/token-interceptor.service';
import { productAdminModel,CreateAdminProductDTO, UpdateProductDTO } from 'src/app/website/modules/products/models/ProductsAdmin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private dataProduct = new BehaviorSubject<productAdminModel[]>([]);
  public dataProduct$ = this.dataProduct.asObservable();

  private fetchProduct = new BehaviorSubject<boolean>(false);
  public fetchProduct$ = this.fetchProduct.asObservable();

  setdataProduct(data: productAdminModel[]) {
    this.dataProduct.next(data);
  }
  setFetchProduct(find: boolean) {
    this.fetchProduct.next(find);
  }

  constructor(private http: HttpClient) { }
  API_URL = environment.domainBack;


  search(search: string, typesSearch: string[]) {
    const types = typesSearch.join(',');
    var params = '?q=' + search;
    if (types) {
      params += '&type=' + types;
    }
    return this.http.get<productAdminModel[]>(`${this.API_URL}/api/v1/products`, {
      context: checkToken(),
    });
  }
  searchProduct(data: string) {
    var params = '?search=' + data;
    return this.http.get<productAdminModel[]>(
      `${this.API_URL}/api/v1/products/searchProduct${params}`, {
        context: checkToken(),
      }
    );
  }

  create(data: CreateAdminProductDTO) {
    return this.http.post(`${this.API_URL}/api/v1/products`, data, {
      context: checkToken(),
    });
  }

  update(id: number, product: UpdateProductDTO) {
    return this.http.patch(`${this.API_URL}/api/v1/products/${id}`, product,{
      context: checkToken(),
    });
  }
  delete(id: number) {
    return this.http.delete(`${this.API_URL}/api/v1/products/${id}`,{
      context: checkToken(),
    });
  }
}
