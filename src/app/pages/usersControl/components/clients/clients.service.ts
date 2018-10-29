import {Injectable} from "@angular/core";
import {Constants} from "../../../../shared/providers/constants";
import {ApiCrudService} from "../../../../shared/providers/api.crud.service";
import { Subject } from "rxjs";
import { User } from '../../../../shared/models/user.model'
/**
 * Created by Tech Group BWL on 30/05/2018.
 */
@Injectable()
export class ClientProductService {

    ENDPOINT: string = 'operadores';

    private showCreateClient = new Subject<void>();
    createClient$ = this.showCreateClient.asObservable();

    private showUpdateClient = new Subject<void>();
    updateClient$ = this.showUpdateClient.asObservable();

    // create new client
     private ShowNewClient = new Subject<User>();
     newClient$ = this.ShowNewClient.asObservable();

    // Show create Order
    private showCreateOrder = new Subject<void>();
    sCreateOrder$ = this.showCreateOrder.asObservable();


    constructor(
        private api: ApiCrudService,
        private C: Constants
    ) {
        // this.api.DOMAIN = 'assets/data/';//TODO: quitame cuando ya exista una api oficial
    }

    retrieveDataForTable(params?: any) {
        let shareGet;

        if (params) {
            // shareGet = this.api.get('data.json', params).share();
            //TODO: descomentame cuando ya exista una api oficial
            shareGet = this.api.get(this.ENDPOINT, params).share();
        } else {
            // shareGet = this.api.get('data.json').share();
            //TODO: descomentame cuando ya exista una api oficial
            shareGet = this.api.get(this.ENDPOINT).share();
        }

        shareGet.map(res => res.json());
        return shareGet;
    }

    createClientProduct() {
        this.showCreateClient.next();
    }
    createClientProductEnd(userModel: any) {
      let userJson = JSON.stringify(userModel);
      // this.api.post(this.C.ENDPOINT_USER, userJson)
      // .subscribe(
      //   res => {
      //     if(res.status == 200){ // Falta devolver el usuario con su respectivo id o genera errores en la tabla
            this.ShowNewClient.next(userModel);
        //   }
        // },
        // err => {
        //   console.log("Error occured "+err);
        // });
    }
    updateClientProduct() {
        this.showUpdateClient.next();
    }

    sCreateOrder() {
        this.showCreateOrder.next();
    }
    createOrder(){}
    removeClientProduct() {}
}
