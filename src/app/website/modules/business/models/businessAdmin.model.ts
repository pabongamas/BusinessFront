import { rolAdminModel } from '../../rols/models/rolAdmin.model';
import { rolesUser } from './../../users/models/rolesUser.model';
interface userxBusiness{
  UserBusinessRole:UserBusinessRole;
  email:string;
  user_id:number;
}
interface UserBusinessRole{
  business_id:number;
  role_id:number;
  user_id:number;
}
export interface businessAdminModel {
    id: string;
    name: string;
    userxBusiness:userxBusiness[];
    roles:any;
  }
  export interface actionBusinessAdmin {
    action: boolean;
  }
  export interface CreateAdminBusinessDTO extends Omit<businessAdminModel, 'id'|'userxBusiness'|'roles'> {}
  
  export interface UpdateBusinessDTO extends Partial<CreateAdminBusinessDTO> {}
  