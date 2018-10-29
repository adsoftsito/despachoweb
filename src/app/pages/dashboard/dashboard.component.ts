import {Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation, EventEmitter} from '@angular/core';
import { GridsterConfig, GridsterItem} from 'angular-gridster2';



@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
 
})
export class Dashboard implements OnInit {
  
  config: GridsterConfig;
  items: Array<GridsterItem>;
  idChartDrag: any;
  itemAdd: number;
  menuDashlet: boolean = false;
  bandera: boolean = false;
  myClass:String;
  @Input() eventoBottun: EventEmitter<any> = new EventEmitter<any>()


  /*
  * configuracion del floatButton
  * */
  configFloatButton:any;


  constructor() {
   

  }

  ngOnInit(){
    this.config = {
      pushItems: true,
      swap: false, //intercambiar elementos
      minCols: 2, //numero minimo de columnas permitidas
      maxCols: 4, //numero maximo de columnas permitidas 
      minRows: 2, //numero minimo de filas permitidas
      maxRows: 8, //numero maximo de filas permitidas
      margin: 50, //margen entre cada gridster-item
      outerMargin: true, //true para poner los 4 margenes de abajo
      outerMarginTop: 2, //margen superior del contenedor gridster
      outerMarginRight: 2, //margen derecho del contenedor gridster
      outerMarginBottom: 2, //margen inferior del contenedor gridster
      outerMarginLeft: 2, //margen izquierdo del conteedor gridster
      enableEmptyCellDrop: true,
     // emptyCellDropCallback: this.emptyCellClick.bind(this),
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        //stop: DragComponent.eventStop,
        //start: DragComponent.eventStart,
        //dropOverItems: false,
        //dropOverItemsCallback: DragComponent.overlapEvent,
      },
      resizable: {
        enabled: true 
      }
    }

    this.items = [
     
    ]


    this.configFloatButton = {
      "listTitle":[
       { id:1 , "title": "pages.dashboard.floatbutton.template"},
       { id:2,  "title": "pages.dashboard.floatbutton.mytemplates"},
       { id:3,  "title": "pages.dashboard.floatbutton.received"}
      ],
      "iconoCambio": "ion-close-round",
      "icono": "motum-i tm-mu tm-dashboard",
      "direccion": "left"
    };



  }

  eventButton(event){
    this.eventoBottun= event;
  }

  
  onItemDrop(e: any){
      if(e.dragData.id == 1 || e.dragData.id == 2 || e.dragData.id == 3 || e.dragData.id == 4){
        this.itemAdd = this.addWidget();
        this.idChartDrag = e.dragData.id;
      }
  }

  addWidget(){
    this.items.push({cols: 2, rows: 2});
    return this.items.length-1;
  }

  deleteItemGridster($event){
    this.items.splice(this.items.indexOf($event), 1);
  }



 


}
