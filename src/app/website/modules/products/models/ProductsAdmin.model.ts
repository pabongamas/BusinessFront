import {BusinessInfoForProduct} from "./../../business/models/businessAdmin.model";
import { CategorieInfoForProduct} from "../../categories/models/CategoriesAdmin.model";

export interface productAdminModel {
    id: number;
    business_id: string;
    business:BusinessInfoForProduct;
    category:CategorieInfoForProduct;
    category_id:string;
    name:string;
    description:string;
    image:string;
    price:string
    create_at:Date;
  }

  export interface actionProductAdmin {
    action: boolean;
  }

  export interface CreateAdminProductDTO extends Omit<productAdminModel, 'id'|'image'|'create_at'|'business'|'category'> {}

  export interface UpdateProductDTO extends Partial<CreateAdminProductDTO>{};
