import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { clientAdminModel } from './../../models/clientAdmin.model';

export class DataSourceClientAdmin extends DataSource<clientAdminModel> {
  data = new BehaviorSubject<clientAdminModel[]>([]);
  originalData: clientAdminModel[] = [];

  connect(): Observable<clientAdminModel[]> {
    return this.data;
  }
  init(clients: clientAdminModel[]) {
    this.originalData = clients;
    this.data.next(clients);
  }
  getData() {
    const clients = this.data.getValue();
    return clients;
  }
  disconnect() {}
}
