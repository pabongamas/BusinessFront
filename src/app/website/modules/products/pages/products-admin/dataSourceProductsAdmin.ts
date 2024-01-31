import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { productAdminModel } from "../../models/ProductsAdmin.model";
import { BehaviorSubject, Observable } from "rxjs";

export class DataSourceProductAdmin extends DataSource<productAdminModel> {
    data = new BehaviorSubject<productAdminModel[]>([]);
    originalData: productAdminModel[] = [];

    override connect(collectionViewer: CollectionViewer): Observable<readonly productAdminModel[]> {
        return this.data;
    }
    override disconnect(collectionViewer: CollectionViewer): void {
    }
    init(categorie: productAdminModel[]) {
        this.originalData = categorie;
        this.data.next(categorie);
    }
    getData() {
        const categorie = this.data.getValue();
        return categorie;
    }

}