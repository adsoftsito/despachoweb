import { Component,  ViewEncapsulation, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { MonitoringReactionService } from '../../montoringReaction.service';
import {EventsService} from "../../../../shared/providers/events";
import {Constants} from "../../../../shared/providers/constants";

@Component({
  selector: 'mr-vehicle-description',
  templateUrl: './vehicle-description.component.html',
  styleUrls: ['./vehicle-description.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class MonitoringReactionVehicleDescriptionComponent implements OnInit, OnChanges {

  @Input() unitInformation: any [];

  operationalState:any;
  economicNumber:any;
  state:any;
  dataConsult :any;
  openActiveFaults:boolean;
  alterClass:string;
  permissionToOpenChatDetail: boolean = false;
  circlecolors;
  options = {
    status: false,
    circleColor: undefined
  };
  @Output() closeVehicleDescription = new EventEmitter<any>();
  closeVehicle: boolean = false;

  constructor(private _services :MonitoringReactionService, private C: Constants, private event: EventsService) {
    this.event.subscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL, (options) => {
      this.permissionToOpenChatDetail = options.status;
    });
   }

   openChatDetail() {
     if(!this.permissionToOpenChatDetail){
       return;
     }

     this.options.status = true;
     this.options.circleColor = this.circlecolors;
     this.event.publish(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL, this.options);
   }

  ngOnInit() {

  }

  close(){
    this.closeVehicleDescription.emit(this.closeVehicle);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.unitInformation){
      this.vehicleStatus(changes.unitInformation.currentValue[0].state.code);
      this.dataConsult = changes;
    }else{
    }
  }


vehicleStatus(status:any){
  if(status === 'Stop-1'){
      this.circlecolors = 'purplecircle'
  }if(status === 'InMotion-1'){
      this.circlecolors = 'greencircle';
  }if(status === 'On-1'){
      this.circlecolors = 'orangecircle';
  }if(status === 'Off-1'){
     this.circlecolors = 'graycircle';
  }

}


expandSection(event){
  if(event){
    this._services.tmOnChangeMenuSize("SUBMENU_1", 6,12);
    this.openActiveFaults = event;
    this.alterClass="clase-prueba";
  }if(!event){
    this._services.tmOnChangeMenuSize("SUBMENU_1", 3,12);
    this.openActiveFaults = event;
    this.alterClass="";
  }
}

ngOnDestroy(){
  this.event.unsubscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL);
  this._services.tmOnChangeMenuSize("SUBMENU_1", 3,12);
}


}
