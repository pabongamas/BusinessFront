interface UserBusinessRole {
  role_id:string;
  user_id:string;
}
export interface BusinessxUser {
    id: string;
    name: string;
    UserBusinessRole:UserBusinessRole
  }
  