export interface businessAdminModel {
    id: string;
    name: string;
  }
  export interface actionBusinessAdmin {
    action: boolean;
  }
  export interface CreateAdminBusinessDTO extends Omit<businessAdminModel, 'id'> {}
  
  export interface UpdateBusinessDTO extends Partial<CreateAdminBusinessDTO> {}
  