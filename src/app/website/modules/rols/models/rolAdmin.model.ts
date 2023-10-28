export interface rolAdminModel {
  id: string;
  name: string;
}
export interface actionRolAdmin {
  action: boolean;
}
export interface CreateAdminRolDTO extends Omit<rolAdminModel, 'id'> {}

export interface UpdateRolDTO extends Partial<CreateAdminRolDTO> {}
