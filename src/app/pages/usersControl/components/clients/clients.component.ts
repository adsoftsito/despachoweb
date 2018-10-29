import {Component, ViewEncapsulation, OnDestroy, OnInit, HostListener, ElementRef, ViewChild} from "@angular/core";
import {LicenseManager} from "ag-grid-enterprise";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {GridOptions} from "ag-grid";
import {ClientProductService} from "./clients.service";
import { timeout } from "rxjs/operator/timeout";
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Created by Tech Group BWL on 30/05/2018.
 */

LicenseManager.setLicenseKey('26f908fcbd31ab5109aab8ba901fe020');

@Component({
    selector: 'client-product-component.col-md-12',                                                                                                                                                                                                                                                                         
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientsProductsComponent implements OnDestroy, OnInit{

    search = 'pages.logistica.clients.search';
    newClient = 'pages.logistica.clients.newClient'; 

    @ViewChild('confirmCreateOrder') window: ElementRef;
    editar: any;
    userModel(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    /** TABLE PROPERTIES **/
    gridOptions: GridOptions;
    rowSelectNow: number;
    rowSelection: string;
    gridColumnApi: any;
    gridApi: any;
    edit: boolean;

    subscriptionCreate: Subscription;
    subscriptionEdit: Subscription;

    isSelectable: boolean = false;


    /** COLUMNS OF THE TABLE **/
    columnDefs: any = [{
        headerName: "Nombre de la cuenta",
        field: "codigo",//solicitante
        suppressSizeToFit: true,
        cellClass: ['motum-hover-name'],
        suppressMenu: true
    }, {
        headerName: "Razón social",
        field: "nombre",//client
        suppressMenu: true
    }, {
        headerName: "Pedido",
        field: "apellidos",//pedido
        cellRenderer: (params) => {
            if (params.value === 0) {
                let eDiv = document.createElement('div');
                eDiv.innerHTML = `<span class="motum-badge dots">Nuevo pedido</span>`;
                let eButton = eDiv.querySelectorAll('.motum-badge.dots')[0];

                eButton.addEventListener('click', () => {
                    this.createOrder();
                });
                return eDiv;
            } else {
                return `${params.value}`;
            }
        },
        suppressMenu: true
    }, {
        headerName: "Fecha de pedido",
        field: "orderDate",//fecha_pedido
        suppressMenu: true
    }, {
        headerName: "Suscripciones",
        field: "subscriptions",//subscriptions
        suppressMenu: true
    }, {
        headerName: "Instaladas",
        field: "installed",//instaladas
        suppressMenu: true
    }, {
        headerName: "Integrantes",
        field: "members",//integrantes
        suppressMenu: true
    }, {
        headerName: "Rol",
        field: "rol",
        suppressMenu: true
    }, {
        headerName: "Último acceso",
        field: "lastAccess",
        suppressMenu: true
    }, {
        headerName: "Estado",
        field: "status",
        cellRenderer: (params) => {
            if (params.value === 0)
                return `<i class="fa fa-circle-o"></i>`;
            if (params.value === 1 || params.value === 2)
                return `<i class="fa fa-circle"></i>`;
        },
        cellStyle: (params) => {
            if (params.value === 0)
                return {color: '#c4c4c4'};
            if (params.value === 1)
                return {color: '#33df69'};
            if (params.value === 2)
                return {color: '#ff3031'};
        },
        suppressMenu: true
    }];
    customIcons: any = {
        sortAscending: '<i class="fa fa-caret-down"/>',
        sortDescending: '<i class="fa fa-caret-up"/>',
    };

    constructor(
        private translate: TranslateService,
        private router: Router,
        private clientProductService :ClientProductService,
        private modalService: NgbModal
    ) {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.headerHeight = 40.58;
        this.gridOptions.animateRows = true;
        this.gridOptions.enableColResize = true;
        this.gridOptions.enableSorting = true;
        this.gridOptions.columnDefs = this.columnDefs;
        this.gridOptions.rowHeight = 40.58;

        this.rowSelection = "multiple";
        this.subscriptionCreate = this.clientProductService.newClient$.subscribe(
          client => {
              // this.onInsertRowUser(client);
              this.onCreateOrder();
        });
    }
    onCreateOrder(){
      const modalRef = this.modalService.open(this.window, { size: 'lg' , keyboard: false, windowClass: 'motum-modal-confirm', backdrop: true });
      modalRef.result.then((userResponse) => {
        if(userResponse) {
          this.router.navigate(['/', 'pages', 'usersControl', 'clients-products', 'orders']).then(nav => {
            setTimeout(() => {
            this.clientProductService.sCreateOrder();
            }, 200);
            //console.log(nav); // true if navigation is successful
          }, err => {
            //console.log(err) // when there's an error
          });
        }
      });
    }
    /** LIFECYCLE ANGULAR METHODS **/
    ngOnInit() {}
    ngOnDestroy(){
      this.subscriptionCreate.unsubscribe();
      // this.subscriptionEdit.unsubscribe();
    }

    /** TABLE METHODS **/
    onGridReady(params) {
        this.gridColumnApi = params.columnApi;
        this.gridApi = params.api;

        this.clientProductService.retrieveDataForTable()
            .subscribe(
                res => {
                    
                    //console.log(res);
                    
                    const body = JSON.parse(res['_body']);
                    
                    
                    const dataToSetup: any = body;
                    
                    console.log('data ...');                    
                    console.log(dataToSetup);
                    console.log('data ...');
                    if (this.gridOptions.api && dataToSetup) {
                        this.gridOptions.api.setRowData(dataToSetup);
                    }
                    setTimeout(() => {
                        console.info("Resize columns");
                        this.gridApi.sizeColumnsToFit();
                    }, 200);
                },
                err => {
                    console.info(err);

                    this.gridOptions.api.setRowData([]);
                    this.gridApi.sizeColumnsToFit();
                    alert("An error has occurred, check your browser console");
                }
            );
    }

    /**
     * Method to show client form to edit a clientProduct
     * @param event
     */
    onCellClicked (event) {
        // HERE GOES CODE TO SHOW EDIT CLIENT FORM
        if(event.column.colId === 'solicitante' && event.data !== null && event.data !== undefined){
            this.router.navigate(['/', 'pages', 'usersControl', 'clients-products', 'edit'])
            .then(nav => {
                    setTimeout(() => {
                        this.clientProductService.updateClientProduct();

                }, 200);
            }, err => {
                console.info(err);
                alert('It was not possible to go to selected route')
            });
        }
    }

    /**
     * Change table to be selectable
     */
    makeSelectableRows() {
        this.columnDefs[0].checkboxSelection = this.isSelectable;
        this.gridOptions.api.setColumnDefs(this.columnDefs);

        this.gridOptions.api.refreshHeader();
        this.gridApi.sizeColumnsToFit();

        if (!this.isSelectable) {
            this.gridOptions.api.deselectAll();
        }
    }

    /**
     * Method to show client form to create a clientProduct
     */
    createClientProduct() {
        this.router.navigate(['/', 'pages', 'usersControl', 'clients-products','create']).then(nav => {
            setTimeout(() => {
               this.clientProductService.createClientProduct();
             }, 200);
             console.log(nav); // true if navigation is successful
            }, err => {
              console.log(err) // when there's an error
              console.log('error router');
          });
    }

    /**
     * Method to remove element(s) from table
     * @param modalDelete: ng-template for modal
     */
    onRemoveSelected(modalDelete) {
    }

    /**
     * The table needs to change its column size when width page changes
     * this method detects all changes on its size.
     *
     * @param event
     */
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.gridApi) {
            setTimeout(() => {
                this.gridApi.sizeColumnsToFit();
            }, 200);
        }
    }

    /**
     * Change status from enable to disabled or vice versa, only on selected rows
     */
    onAbleDisableSelected(flag: boolean) {
        let selectedRows = this.gridApi.getSelectedRows();
        if (selectedRows.length && selectedRows.length > 0) {
            selectedRows.forEach(selectedRow => {
                selectedRow.status = flag;
            });
            this.gridApi.updateRowData({update: selectedRows});
        }
    }

    createOrder() {
        console.info("Waiting for new code!");
        this.router.navigate([ '/', 'pages', 'usersControl', 'clients-products', 'orders'])
          .then(nav => {
            setTimeout(() => {
                this.clientProductService.sCreateOrder();
            }, 200);
          });
    }
}
