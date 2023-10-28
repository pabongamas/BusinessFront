import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { businessAdminModel } from '../../models/businessAdmin.model';

export class DataSourceBusinessAdmin extends DataSource<businessAdminModel> {
  data = new BehaviorSubject<businessAdminModel[]>([]);
  originalData: businessAdminModel[] = [];

  connect(): Observable<businessAdminModel[]> {
    return this.data;
  }
  init(business: businessAdminModel[]) {
    this.originalData = business;
    this.data.next(business);
  }
  getData() {
    const business = this.data.getValue();
    return business;
  }
  disconnect() {}
}
