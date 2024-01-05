export interface categorieAdminModel {
    category_id: number;
    name: string;
    image:string;
    create_at:Date;
  }

  export interface actionCategorieAdmin {
    action: boolean;
  }

  export interface CreateAdminCategorieDTO extends Omit<categorieAdminModel, 'category_id'|'image'|'create_at'> {}
  
  export interface UpdateCategorieDTO extends Partial<CreateAdminCategorieDTO>{};
