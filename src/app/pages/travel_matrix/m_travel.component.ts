import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MTravelService } from './m_travel.service';
import { CardOperative } from './components/card_operative_cicle/card_operative_cicle.component';
import { CardOrders } from './components/card_orders/card_orders.component';
import { TableComponent } from './components/table/data_table.component';
import { Compiler } from '@angular/core';

@Component({
    selector: 'matriz-viaje',
    templateUrl: './m_travel.component.html',
    styleUrls: ['./m_travel.component.css'],
    providers: [MTravelService],
})
export class MTravelComponent implements OnInit, OnDestroy, AfterViewInit {
  data: any;
  interval: any;
  timeToRequest: number = 60000; // milisecundos

  @ViewChild('operative') cardoperative: CardOperative;
  @ViewChild('orders') orders: CardOrders;
  @ViewChild('tableAg') tableag: TableComponent;

  constructor(private mTravelService: MTravelService, private _compiler: Compiler) {}

  ngOnInit() {
    // Datos
    this.mTravelService.getInfo().subscribe(
      info => {
      this.data = info;
    });
  }

  ngAfterViewInit () {
    this.interval = setInterval(() => {
      this.mTravelService.getInfo().subscribe(
        requestTime => {
          if (this.cardoperative !== undefined) {
            this.cardoperative.generatorCard(requestTime);
          }
          if (this.orders !== undefined) {
            this.orders.generatorCard(requestTime);
          }
          this._compiler.clearCache();
          this.setDataOnChanges(requestTime.definitionRow);
          requestTime.definitionRow = undefined;
        })}, this.timeToRequest);
      }

      setDataOnChanges(data) {
        // Busqueda y asignacion de la fila que ha cambiado
        for (let i = 0; i < data.length; i++) {
            const rowNode = this.tableag.gridOptions.api.getRowNode(data[i].id);
            if (rowNode !== undefined) {
              // Nuevo valor para la fila
              rowNode.setData(data[i]);
            }else {
              // La fila es nueva entonces se agrega
               this.tableag.gridOptions.api.updateRowData({ add: [data[i]] });
            }
        }
        // this.tableag.gridOptions.api.setColumnsVisible(['gps','mainFleet'] , false);
        // const rowData = [];
        // this.tableag.gridOptions.api.forEachNode( function(node) {
        //     rowData.push(node.data);
        // });
        // let savedSort = this.tableag.gridOptions.api.getSortModel();
        // this.tableag.gridOptions.api.setSortModel(savedSort);
        // this.tableag.gridOptions.api.setRowData(rowData);
      }

  ngOnDestroy() {
    if (this.interval ) {
      clearInterval(this.interval);
    }
  }
 }
