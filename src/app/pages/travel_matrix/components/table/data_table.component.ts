import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapsAPILoader } from '@agm/core';
import { MTravelService } from '../../m_travel.service';
declare let google: any;
import { LicenseManager } from 'ag-grid-enterprise/main';

LicenseManager.setLicenseKey('26f908fcbd31ab5109aab8ba901fe020');

@Component({
    selector: 'table-ag',
    templateUrl: './data_table.component.html',
    styleUrls: ['./data_table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MTravelService],
})
export class TableComponent implements OnInit {
  gridOptions: GridOptions;
  @Input() tableData: any;
  api: GridApi;
  geo: any;
  private columnApi: ColumnApi;
  widthTable: any;
  margin: number = 0.209;
  puntoInicial: any;
  puntoFinal: any;
  ruta: any = [];
  savedState: any;
  savedPivotMode: any;
  gridColumnApi: any;
  constructor(private modalService: NgbModal,
              private mapsAPILoader: MapsAPILoader,
              private mTravelService: MTravelService ) {

    this.gridOptions = <GridOptions>{};
    this.gridOptions.headerHeight = 25;
    this.gridOptions.animateRows = true;
    this.gridOptions.enableColResize = true;
    this.gridOptions.getRowNodeId = function(data) { return data.id; };
    this.gridOptions.enableSorting = true;
    // this.gridOptions.onFilterChanged = function() {
    //   console.info('onFilterChanged ');
    // };
    // this.gridOptions.onFilterModified = function() {
    //   console.info('onFilterModified');
    // };
    // this.gridOptions.accentedSort = true;
    this.widthTable = window.innerWidth - (window.innerWidth * this.margin);
    window.onresize = (e) => {
          this.widthTable = window.innerWidth - (window.innerWidth * this.margin);
      };
      // this.gridOptions.onColumnVisible = function (event) {
      //   if (event.visible) {
      //     console.info(event.column.colId + ' was made visible');
      //   } else {
      //     console.info(event.column.colId  + ' was hidden')
      //   }
      // }
    // this.gridOptions.api.sizeColumnsToFit(this.widthTable);
  }
  private onReady(params) {
      this.api = params.api;
      this.columnApi = params.columnApi;
  }

  ngOnInit () {
    if ( this.tableData !== null ) {
      this.gridGenerator(this.tableData);
    }
  }

  gridGenerator(data) {
      // Var definition of colums
      const header = data.definitionColumn;
      // Var row content
      const columns: any[] = [];
      let headtable: any = '';
      let childrenColums: any[] = [];

      Object.keys(header).map(function(key, index) {
        // selection seccion level
        Object.keys(header[key]).map(function(key2) {
          // get columName
          if (key2 === 'columName') {
            headtable  = header[key][key2];
          }else {
            // get childrenColums
            Object.keys(header[key][key2]).map(function(key3) {
              if (key3 === 'gps') {
                childrenColums.push({
                 headerName: header[key][key2][key3],
                 field: key3,
                 width: 75, minWidth: 50, maxWidth: 100,
                 cellClass: 'fa fa-map-marker fa-lg text-danger',
                 cellRenderer: function(params) {
                    return `<input type="hidden" id="gps" value=${params.value} ></input>`;
                  },
                  cellStyle: { 'text-align': 'center' },
                  suppressFilter: true,
                  editable: false,
                  pivot: true,
                  filter: 'text',
                  // columnGroupShow: 'closed',
                  // openByDefault: true,
                });
              }else {
                  childrenColums.push({
                   headerName: header[key][key2][key3],
                   field: key3,
                   width: 70, minWidth: 50, maxWidth: 350,
                   cellStyle: function(params) {
                     if (params.value !== undefined) {
                      let keyname: string = params.value.valueOf();
                      keyname = keyname.toLowerCase();
                      for (let i = 0; i < data.cellstyle.length; i++) {
                        if (keyname === data.cellstyle[i].key) {
                            return { backgroundColor: data.cellstyle[i].color };
                        }
                      }
                      }
                    },
                    // suppressFilter: true,
                    editable: false,
                    pivot: true,
                    filter: 'text',
                    // columnGroupShow: 'open',
                  });
                }
            });
          }
        });
        // set columns definition
        columns.push({
          headerName: headtable,
          marryChildren: true,
          children: childrenColums,
        });
        childrenColums = [];
      });

      // Set columns to ag-grid
      this.gridOptions.columnDefs = columns;

      // Set rows to rowData ag-grid
      this.gridOptions.rowData = this.mTravelService.orderDataTable (data.definitionRow);
      this.gridOptions.floatingFilter = true;
      // this.gridOptions.api.autoSizeAllColumns();
    }

    onCellClicked(e, content) {
      if (e.event.target !== undefined && e.event.target.getAttribute('col-id') === 'gps') {
        const data = e.data.gps;
        this.puntoInicial = undefined;
        this.puntoFinal = undefined;
        this.ruta = [];
        if (data !== null) {
          this.mapsAPILoader.load().then(() => {
            for (let i = 0; i < data.ruta.length; i++) {
                this.ruta.push({
                  location: new google.maps.LatLng(data.ruta[i].lat, data.ruta[i].long),
                  stopover: false,
                  // duration: 'date'
                });
            }
          });
          this.puntoInicial = data.punto_inicial;
          this.puntoFinal = data.punto_final;
          if (this.puntoInicial !== undefined && this.puntoFinal !== undefined) {
            this.modalService.open(content, { size: 'lg' , keyboard: false });
          }
        }
      }
    }
    saveState() {
      this.savedState = this.gridColumnApi.getColumnState();
      this.savedPivotMode = this.gridColumnApi.isPivotMode();
    }

    restoreState() {
      this.gridColumnApi.setColumnState(this.savedState);
      this.gridColumnApi.setPivotMode(this.savedPivotMode);
    }

     onGridReady(params) {
        //  params.api.sizeColumnsToFit();
         this.gridColumnApi = params.columnApi;
     }
}
