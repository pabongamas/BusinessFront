import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { categorieAdminModel } from '../../models/CategoriesAdmin.model';

export class DataSourceCategorieAdmin extends DataSource<categorieAdminModel> {
  data = new BehaviorSubject<categorieAdminModel[]>([]);
  originalData: categorieAdminModel[] = [];

  connect(): Observable<categorieAdminModel[]> {
    return this.data;
  }
  init(categorie: categorieAdminModel[]) {
    this.originalData = categorie;
    this.data.next(categorie);
  }
  getData() {
    const categorie = this.data.getValue();
    return categorie;
  }
  disconnect() {}
}
