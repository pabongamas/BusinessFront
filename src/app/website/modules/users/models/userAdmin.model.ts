import { BusinessxUser } from "./BusinessxUser.model";
import { rolesUser } from "./rolesUser.model";
export interface userAdminModel {
  id: string;
  email: string;
  BusinessxUser:BusinessxUser[];
  roles:rolesUser[];
  business:string;
  rolesData:string,
  password:string,
}
export interface actionUserAdmin{
  action:boolean;
}