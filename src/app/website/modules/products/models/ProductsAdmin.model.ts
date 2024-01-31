import {BusinessInfoForProduct} from "./../../business/models/businessAdmin.model";
import { CategorieInfoForProduct} from "../../categories/models/CategoriesAdmin.model";

export interface productAdminModel {
    id: number;
    business_id: number;
    business:BusinessInfoForProduct;
    category:CategorieInfoForProduct;
    category_id:number;
    name:string;
    description:string;
    image:string;
    price:number
    create_at:Date;
  }