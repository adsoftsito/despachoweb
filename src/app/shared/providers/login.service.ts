import {Injectable} from "@angular/core";
import {ApiCrudService} from "./api.crud.service";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {Constants} from "./constants";
/**
 * Created by Tech Group BWL on 25/07/2018.
 */
@Injectable()
export class LoginService {

  private ENDPOINT: string = 'users';
  private ENDPOINT_AUTH: string = '/authenticate';

  constructor(
    private api: ApiCrudService,
    private _storage: StorageService,
    private C: Constants
  ) {}

  authenticate(body): Observable<Response> {
    if (!body) throw new Error("It's required a body");
    if (!body.email) throw new Error("It's required email field");
    if (!body.password) throw new Error("It's required password field");

    let post = this.api.post(`${this.ENDPOINT}${this.ENDPOINT_AUTH}`, body);
    post.map(res => res.json);
    return post;
  }

  loggedIn(userData): void {
    this._storage.setLocal(this.C.USER_DATA_KEY, userData);
  }

  logout(): void {
    this._storage.localDeleteAll();
  }

  isLogged(): any {
    return this._storage.getLocal(this.C.USER_DATA_KEY);
  }
}