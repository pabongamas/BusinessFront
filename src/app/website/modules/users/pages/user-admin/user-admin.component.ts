import { Component, inject, OnInit } from '@angular/core';
import { userAdminModel } from './../../models/userAdmin.model';
import { DataSourceUserAdmin } from './dataSourceUserAdmin';
import { UserService } from './../../../../services/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  standalone: true,
  styleUrls: ['./user-admin.component.sass'],
})
export class UserAdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email'];
  private service = inject(UserService);
  dataSource = new DataSourceUserAdmin();
  ngOnInit(): void {
    this.service.search('', []).subscribe((data) => {
      console.log(data);
    });
  }
}
