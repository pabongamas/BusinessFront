import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { userAdminModel } from './../../models/userAdmin.model';

export class DataSourceUserAdmin extends DataSource<userAdminModel> {
  data = new BehaviorSubject<userAdminModel[]>([]);
  originalData: userAdminModel[] = [];

  connect(): Observable<userAdminModel[]> {
    return this.data;
  }
  init(user: userAdminModel[]) {
    this.originalData = user;
    this.data.next(user);
  }
  getData() {
    const user = this.data.getValue();
    return user;
  }
  disconnect() {}
}
