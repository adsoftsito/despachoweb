import {Component, OnInit, ViewEncapsulation, HostListener, OnDestroy} from '@angular/core';
import { GridOptions } from 'ag-grid';//ColumnApi, GridApi,
import { LicenseManager } from 'ag-grid-enterprise/main';
import { UserService } from "./user.service";
import { User } from '../../../../shared/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/**
 * Setting up license
 */
LicenseManager.setLicenseKey('26f908fcbd31ab5109aab8ba901fe020');

@Component({
  selector: 'users-component.col-md-12',
  templateUrl: './users.component.html',
  styleUrls: ['users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit, OnDestroy {

  gridOptions: GridOptions;
  gridColumnApi: any;
  isChecked: boolean = false;
  widthTable: any;
  margin: number = 0.709;
  rowSelectNow: number;
  myTranslate: any = {};
  subscriptionCreate: Subscription;
  subscriptionEdit: Subscription;

  private gridApi;

  private rowSelection;
  isRemember: boolean = false;

  columnDefs: any = [
    {
      colId: 'nombre',
      headerName: "Nombre",
      field: "name",
      suppressSizeToFit: true,
      checkboxSelection: false,
      cellClass: ['motum-hover-name'],
      suppressMenu: true
    },
    {
      headerName: "Usuario",
      field: "username",
      suppressMenu: true
    },
    {
      headerName: "Productos",
      field: "products",
      suppressMenu: true
    },
    {
      headerName: "Rol",
      field: "rol",
      suppressMenu: true
    },
    {
      headerName: "Último acceso",
      field: "lastAccess",
      suppressMenu: true
    },
    {
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
    },
  ];
  customIcons: any = {
    sortAscending: '<i class="fa fa-caret-down"/>',
    sortDescending: '<i class="fa fa-caret-up"/>',
  };

  // specify the data
  rowData: any = [];

  constructor(
      private userService: UserService, private translate: TranslateService, private router: Router,
      private modalService: NgbModal
  ) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.headerHeight = 40.58;
    this.gridOptions.animateRows = true;
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.rowHeight = 40.58;
    // this.gridOptions.getRowNodeId = function(data) { return data.id; };
    // this.gridOptions.rowData = this.rowData;

    // this.widthTable = window.innerWidth - (window.innerWidth * this.margin);
    // window.onresize = (e) => {
    //   this.widthTable = window.innerWidth - (window.innerWidth * this.margin);
    // };

    this.translate.get('pages.titletable').subscribe( res =>{
      this.UpdateHeaderName(res);
    });

    this.rowSelection = "multiple";
    this.subscriptionCreate = this.userService.newUser$.subscribe(
      user => {
          this.onInsertRowUser(user);
    });
    this.subscriptionEdit = this.userService.editUserResponse$.subscribe(
      userEdit => {
          this.onInsertEditUser(userEdit);
    });
  }
  createUser() {
   setTimeout(() => {
     this.userService.sCreateUser();
    }, 200);
  }
  ngOnInit() {

  }
  ngOnDestroy(){
    this.subscriptionCreate.unsubscribe();
    this.subscriptionEdit.unsubscribe();
  }
  onInsertEditUser(user) {
    let newData = this.createNewRowDataUser(user);
    let rowNode = this.gridApi.getRowNode(this.rowSelectNow);
    if (rowNode !== undefined) {
      rowNode.setData(newData);
    }
  }
  onInsertRowUser(user: User) {
    var newData = this.createNewRowDataUser(user);
    this.gridApi.updateRowData({
      add: [newData],
      addIndex: 0
    });
  }
  createNewRowDataUser(data) {
    var newData = {
      id: data.id,
      nombre: data.nombre,
      telefono: data.telefono,
      email: data.email,
      usuario: data.usuario,
      apellidop: data.apellidop,
      apellidom: data.apellidom,
      rol: data.rol,
      status: data.status
    };

    return newData;
  }

  onGridReady(params) {

    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;

   
    this.userService.getDataForTable()
        .subscribe(
            res => {
              const body = JSON.parse(res['_body']);
              const updates: any = body.users;

              if (this.gridOptions.api && updates)
                this.gridOptions.api.setRowData(updates);

              setTimeout(() => {
                console.info("Resize columns");
                this.resizingColumns();
              }, 200);
            }, err => {
              console.info(err);
              this.gridOptions.api.setRowData([]);
              this.resizingColumns();
              alert("An error: " + JSON.parse(err['_body']).errors);
            }
        );
  }


  resizingColumns() {
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged() {
    let selectedRows = this.gridApi.getSelectedRows();
    let selectedRowsString = "";

    selectedRows.forEach((selectedRow, index) => {
      if (index > 5) {
        return;
      }

      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.username;
    });
  }
  onCellClicked (e) {
    if(e.column.colId === 'nombre' && e.data !== null && e.data !== undefined){
      this.router.navigate(['/', 'pages', 'usersControl', 'users', 'edit']).then(nav => {
        this.rowSelectNow = e.rowIndex;
        setTimeout(() => {
          this.userService.sEditUser(e.data);
        }, 200);
       
      }, err => {
        console.log(err) 
      });
    }
  }
  onRemoveSelected(modalDelete) {
    const modalRef = this.modalService.open(modalDelete, { size: 'lg' , keyboard: true, windowClass: 'motum-modal-delete', backdrop: true });
    modalRef.result.then((userResponse) => {
      if(userResponse) {
        let selectedData = this.gridApi.getSelectedRows();
        let res: any[] = [];
        if (selectedData.length && selectedData.length > 0) {
          selectedData.forEach((selectedRow) => {
            if(this.userService.deleteUser(selectedRow)){
              res.push(selectedRow);
            }
          });
        }
        this.gridApi.updateRowData({remove: res});
      }
    });
  }

 

  makeSelectableRow() {
    this.columnDefs[0].checkboxSelection = this.isRemember;
    this.gridOptions.api.setColumnDefs(this.columnDefs);

    this.gridOptions.api.refreshHeader();
    this.resizingColumns();

    if (!this.isRemember) {
      this.gridOptions.api.deselectAll();
    }
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
        this.resizingColumns();
      }, 200);
    }
  }

 

  UpdateHeaderName(userlabels: any){
    this.columnDefs[0].headerName = userlabels.name;
    this.columnDefs[1].headerName = userlabels.username;
    this.columnDefs[2].headerName = userlabels.product;
    this.columnDefs[4].headerName = userlabels.last_access;
    this.columnDefs[3].headerName = userlabels.rol;
    this.columnDefs[5].headerName = userlabels.status;

    this.gridOptions.columnDefs = this.columnDefs;
  }

 

  onDisableSelected() {
    let selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length && selectedRows.length > 0) {
      selectedRows.forEach((selectedRow) => {
        if(this.userService.editUsers(selectedRow)){
          selectedRow.status = false;
        }
      });
      this.gridApi.updateRowData({update: selectedRows});
    }
  }

  
  onAbleSelected() {
    let selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length && selectedRows.length > 0) {
      selectedRows.forEach((selectedRow) => {
        if(this.userService.editUsers(selectedRow)){
          selectedRow.status = true;
        }
      });
      this.gridApi.updateRowData({update: selectedRows});
    }
  }

  unClick() {
    console.info("Un click");
  }
}
