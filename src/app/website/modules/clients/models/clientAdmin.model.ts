
interface userInfo{
    email:string;
    id:number;
}
interface businessInfo{
    name:string;
    id:number;
}
export interface clientAdminModel {
    id: string;
    names:string;
    lastnames:string;
    nickname:string;
    phone:string;
    gender:boolean;
    birthdate:string;
    address:string;
    createdAt:string;
    active:boolean;
    user:userInfo;
    business:businessInfo;
  }

  