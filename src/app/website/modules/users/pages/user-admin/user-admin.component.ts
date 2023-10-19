import { Component, inject, OnInit } from '@angular/core';
import { userAdminModel } from './../../models/userAdmin.model';
import { DataSourceUserAdmin } from './dataSourceUserAdmin';
import { UserService } from './../../../../services/user.service';
import { NgFor } from '@angular/common';

import { CdkTableModule } from '@angular/cdk/table';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  standalone: true,
  styleUrls: ['./user-admin.component.sass'],
  imports: [CdkTableModule, NgFor],
})
export class UserAdminComponent implements OnInit {
  dataUser: userAdminModel[] = [];
  private service = inject(UserService);
  dataSource = new DataSourceUserAdmin();
  ngOnInit(): void {
    this.service.search('', []).subscribe((data) => {
      data.map((item) => {
        item.business = item.BusinessxUser.map((obj) => obj.name).join(',');
        item.rolesData = item.roles.map((obj) => obj.name).join(',');
        return item;
      });
      this.dataUser = data;
      this.dataSource.init(this.dataUser);
    });
  }
}
