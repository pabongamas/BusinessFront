import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { rolAdminModel } from '../../models/rolAdmin.model';

export class DataSourceRolAdmin extends DataSource<rolAdminModel> {
  data = new BehaviorSubject<rolAdminModel[]>([]);
  originalData: rolAdminModel[] = [];

  connect(): Observable<rolAdminModel[]> {
    return this.data;
  }
  init(user: rolAdminModel[]) {
    this.originalData = user;
    this.data.next(user);
  }
  getData() {
    const user = this.data.getValue();
    return user;
  }
  disconnect() {}
}
