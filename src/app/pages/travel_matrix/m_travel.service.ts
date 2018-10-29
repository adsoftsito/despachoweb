import { HttpModule, JsonpModule } from '@angular/http';
import { Http, Response, Headers , RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class MTravelService {
  // urlService: string = 'http://localhost:8080/v1/data-table';
  urlService: string = 'http://landcserver.dyndns.org:8484/webservice/v1/data-table';

  username: string = 'username';
  password: string = 'password';

  headers: Headers = new Headers();

  varOrderOne: string = 'entr'; // lowercase contains
  varOrderTwo: string = 'pen';
  varOrderTree: string = 'asi';
  varSubOrderTwoOne: string = 'carga';

  constructor(private _http: Http) {
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append( 'X-Requested-With', 'XMLHttpRequest');
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  getInfo(): Observable<any> {
    this.headers.delete('Authorization');
    // keys(): string[]
    this.headers.append('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));
    return this._http.get(this.urlService, { headers: this.headers }).map((res: Response) => res.json());
  }

  getCardValue(body, keyCode , cardProperties) {
    let count = 0;
    let indexData: number = 0;
    let auxx: boolean = false;
    let evaluarKey: any = '';
    let evaluarValue: number = 0;
    const columsData: any[] = cardProperties.columData.split('-');
    const keyCodes: any[] = keyCode.split('|');
    let indexControl: any;
    if (columsData.length > 1) {
      // console.info(ColumsData +" "+keyCodes );
      Object.keys(body).map(function(key, index) {
        // selection Row
        Object.keys(body[key]).map(function(key2, index2) {
          if (key2 === columsData[indexData]) {
            evaluarKey = key2;
            indexControl = key;
            auxx = true;
          }
          if (auxx) {
            if (body[indexControl][evaluarKey] === keyCodes[indexData]) {
              evaluarValue++;
            }
            if (indexData < columsData.length - 1) {
              indexData++;
            }else {
              if (indexData === columsData.length - 1) {
                if (evaluarValue === columsData.length) {
                  count++;
                }
                evaluarValue = 0;
                indexData = 0;
              }
            }
            auxx = false;
          }
        });
      });
    }else {
      Object.keys(body).map(function(key, index) {
        // selection Row
        Object.keys(body[key]).map(function(key2, index2) {
          if (key2 === columsData[0]) {
            evaluarKey = key2;
            indexControl = key;
            auxx = true;
          }
          if (auxx) {
            if (body[indexControl][evaluarKey] === keyCodes[indexData]) {
              count++;
            }
            if (indexData < keyCodes.length - 1) {
              indexData++;
            }else {
              if (indexData === keyCodes.length - 1) {
                indexData = 0;
              }
            }
            auxx = false;
          }
        });
      });
    }
    return count;
  }

  orderDataTable (data) {
       const len = data.length;
       for (let i = len - 1; i >= 0; i--) {
         for (let j = 1; j <= i; j++) {
            // if(arr[j-1]>arr[j]){
           if (data[j].orderStatus.toLowerCase().indexOf( this.varOrderOne) > -1) {
               const temp = data[j - 1];
               data[j - 1] = data[j];
               data[j] = temp;
            } else {
              if (data[j].orderStatus.toLowerCase().indexOf( this.varOrderTwo) > -1
                  && data[j - 1].orderStatus.toLowerCase().indexOf( this.varOrderOne) === -1) {
                  const temp = data[j - 1];
                  data[j - 1] = data[j];
                  data[j] = temp;
                  if (data[j].processStatus.toLowerCase().indexOf(this.varSubOrderTwoOne) > -1) {
                    const temp = data[j - 1];
                    data[j - 1] = data[j];
                    data[j] = temp;
                  }
               } else {
                 if (data[j].orderStatus.toLowerCase().indexOf(this.varOrderTree) > -1
                     && data[j - 1].orderStatus.toLowerCase().indexOf(this.varOrderTwo) === -1) {
                         const temp = data[j - 1];
                         data[j - 1] = data[j];
                         data[j] = temp;
                 } else {
                   if (data[j - 1] < data[j]) {
                     const temp = data[j - 1];
                     data[j - 1] = data[j];
                     data[j] = temp;
                   }
                 }
               }
            }
         }
       }
    return data;
  }
  // data.sort(function(a, b) {
  //   if (a.orderStatus !== undefined && b.orderStatus !== undefined) {
  //     if (a.orderStatus.toLowerCase() === 'entregado') {
  //       return -1;
  //     }
  //     if (a.orderStatus.toLowerCase() === 'liquidada') {
  //       return 1;
  //     }
  //     if (a.orderStatus === b.orderStatus) {
  //       if (a.processStatus !== b.processStatus) {
  //         if (a.processStatus.toLowerCase() === 'en ruta') {
  //           return 0;
  //         } else {
  //           return 1;
  //         }
  //       }
  //     }
  //     return a.orderStatus < b.orderStatus ? 1 : a.orderStatus > b.orderStatus ? -1 : 0;
  //   }else {
  //     return 0;
  //   }
  // });
  // data.sort(function(a, b) {
  //   if (a.orderStatus !== undefined && b.orderStatus !== undefined) {
  //     if (a.orderStatus.toLowerCase() === 'entregado') {
  //       return -1;
  //     }
  //     if (a.orderStatus.toLowerCase() === 'liquidada') {
  //       return 1;
  //     }
  //     return 0;
  //   }else {
  //     return 0;
  //   }
  // });
}
