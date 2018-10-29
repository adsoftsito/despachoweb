import { Component, OnInit, Output, EventEmitter } from '@angular/core';
/**
 * Created by Tech Group BWL on 17/07/2018.
 */
@Component({
  selector: 'mr-filtering-options',
  templateUrl: './filteringOptions.component.html',
  styleUrls: ['./filteringOptions.component.scss']
})
export class MonitoringReactionFilteringOptionsComponent implements OnInit {

  @Output() closeFiltering = new EventEmitter<any>();

  unitFilteringOptions: Array<any> = [];
  chipsFleetTree: Array<any> = [];
  chipsOperationStatus: Array<any> = [];
  chipsPointsInterest: Array<any> = [];
  chipsTypeVehicle: Array<any> = [];
  chipsServiceStatus: Array<any> = [];

  flagCheck1: boolean = false;
  flagCheck2: boolean = true;
  flagCheck3: boolean = false;
  flagCheck4: boolean = false;
  flagFilterSelection: boolean = false;
  labelColorStop: string = 'defaultLabel';
  labelColorOff: string = 'defaultLabel';
  labelColorMoving: string = 'defaultLabel';
  labelColorOn: string = 'defaultLabel';
  flagOperationStatus: boolean = false;
  flagPointsInterest: boolean = false;
  flagTypeVehicle: boolean = false;
  flagServiceStatus: boolean = false;

  //translate
  filteringOptions = 'pages.monitoringreaction.filteringOptions.filteringOptions';
  selectedFilters = 'pages.monitoringreaction.filteringOptions.selectedFilters';
  fleetTree = 'pages.monitoringreaction.filteringOptions.fleetTree';
  vehicleStatusTrans = 'pages.monitoringreaction.filteringOptions.vehicleStatus';
  operationStatusTrans = 'pages.monitoringreaction.filteringOptions.operationStatus';
  pointsInterestTrans = 'pages.monitoringreaction.filteringOptions.pointsInterest';
  typeVehicleTrans = 'pages.monitoringreaction.filteringOptions.typeVehicle';
  serviceStatusTrans = 'pages.monitoringreaction.filteringOptions.serviceStatus';
  stopped = 'pages.monitoringreaction.filteringOptions.stopped';
  off = 'pages.monitoringreaction.filteringOptions.off';
  inMotion = 'pages.monitoringreaction.filteringOptions.inMotion';
  on = 'pages.monitoringreaction.filteringOptions.on';

  constructor() { }
  
  ngOnInit() {
    
    setTimeout(() => {
      this.unitFilteringOptions = [
        {
          fleetTree : [{ label: 'Daimler', code: 'F-T-1'}, { label: 'PDI', code: 'F-T-2'}],
          vehicleStatus: [{ stopped: 'false'}, { off: 'true'}, { inMotion: 'false'}, { on: 'true'}],
          operationStatus : [{ label: 'Disponible', code: 'O-S-1'}, { label: 'Inicio de viaje', code: 'O-S-2'}, {label: 'En viaje', code: 'O-S-3'}],
          pointsInterest : [{ label: 'Dentro de', code: 'P-I-1'}, { label: 'Cerca de', code: 'P-I-2'}],
          typeVehicle : [{ label: 'Tractor', code: 'T-V-1'}, { label: 'Automóvil', code: 'T-V-2'}, {label: 'Motocicleta', code: 'T-V-3'}],
          serviceStatus : [{ label: 'En línea', code: 'S-S-1'}, { label: 'Baja cobertura', code: 'S-S-2'}, {label: 'Robada', code: 'S-S-3'}, {label: 'Accidentada', code: 'S-S-4'}],
       }
      ]
      this.chipsFleetTree = this.unitFilteringOptions[0].fleetTree;
      this.chipsOperationStatus = this.unitFilteringOptions[0].operationStatus;
      this.chipsPointsInterest = this.unitFilteringOptions[0].pointsInterest;
      this.chipsTypeVehicle = this.unitFilteringOptions[0].typeVehicle;
      this.chipsServiceStatus = this.unitFilteringOptions[0].serviceStatus;
      this.flagCheck1 = this.unitFilteringOptions[0].vehicleStatus.stopped;
      this.flagCheck2 = this.unitFilteringOptions[0].vehicleStatus.off;
    }, 2000);
  }

  checkboxStop(flagCheck1){
    if(flagCheck1 == false){ this.flagCheck1 = true; this.labelColorStop = 'selecctLabel'; } else{ this.flagCheck1 = false; this.labelColorStop = 'defaultLabel'; }
  }
  checkboxOff(flagCheck2){
    if(flagCheck2 == false){ this.flagCheck2 = true; this.labelColorOff = 'selecctLabel'; } else{ this.flagCheck2 = false; this.labelColorOff = 'defaultLabel'; }
  }
  checkboxMoving(flagCheck3){
    if(flagCheck3 == false){ this.flagCheck3 = true; this.labelColorMoving = 'selecctLabel'; } else{ this.flagCheck3 = false; this.labelColorMoving = 'defaultLabel'; }
  }
  checkboxOn(flagCheck4){
    if(flagCheck4 == false){ this.flagCheck4 = true; this.labelColorOn = 'selecctLabel'; } else{ this.flagCheck4 = false; this.labelColorOn = 'defaultLabel'; }
  }

  openFilteringOptions(flagCloseFiltering){
    this.closeFiltering.emit(flagCloseFiltering);
  }
  
  selectionOptions(selectionOptions){
    for (let i=0; i<selectionOptions.length; i++) {
          this.unitFilteringOptions[0].operationStatus.push(
            {
              label: selectionOptions[i].label,
              code: selectionOptions[i].code
            } 
          );
    }
    this.closeFilterSelection();
  }
 

  selectionOptionsPI(selectionOptions){
    for (let i=0; i<selectionOptions.length; i++) {
          this.unitFilteringOptions[0].pointsInterest.push(
            {
              label: selectionOptions[i].label,
              code: selectionOptions[i].code
            } 
          );
    }
    this.closeFilterSelection();
  }
  selectionOptionsTV(selectionOptions){
    for (let i=0; i<selectionOptions.length; i++) {
          this.unitFilteringOptions[0].typeVehicle.push(
            {
              label: selectionOptions[i].label,
              code: selectionOptions[i].code
            } 
          );
    }
    this.closeFilterSelection();
  }
  selectionOptionsSS(selectionOptions){
    for (let i=0; i<selectionOptions.length; i++) {
          this.unitFilteringOptions[0].serviceStatus.push(
            {
              label: selectionOptions[i].label,
              code: selectionOptions[i].code
            } 
          );
    }
    this.closeFilterSelection();
  }

  closeFS(){
    this.closeFilterSelection();
  }
  closeFilterSelection(){
    this.flagFilterSelection = false;
  }

  deleteChip(chip){
    for (let i = 0; i < this.unitFilteringOptions[0].operationStatus.length; i++) {
      if (this.unitFilteringOptions[0].operationStatus[i] == chip) {
          this.unitFilteringOptions[0].operationStatus.splice(i, 1);
      }
    }
  }
  deleteChipPI(chip){
    for (let i = 0; i < this.unitFilteringOptions[0].pointsInterest.length; i++) {
      if (this.unitFilteringOptions[0].pointsInterest[i] == chip) {
          this.unitFilteringOptions[0].pointsInterest.splice(i, 1);
      }
    }
  }
  deleteChipTV(chip){
    for (let i = 0; i < this.unitFilteringOptions[0].typeVehicle.length; i++) {
      if (this.unitFilteringOptions[0].typeVehicle[i] == chip) {
          this.unitFilteringOptions[0].typeVehicle.splice(i, 1);
      }
    }
  }
  deleteChipSS(chip){
    for (let i = 0; i < this.unitFilteringOptions[0].serviceStatus.length; i++) {
      if (this.unitFilteringOptions[0].serviceStatus[i] == chip) {
          this.unitFilteringOptions[0].serviceStatus.splice(i, 1);
      }
    }
  }

  showOperationStatus(){
      this.flagFilterSelection = true;
      this.flagOperationStatus = true;
      this.flagPointsInterest = false;
      this.flagTypeVehicle = false;
      this.flagServiceStatus = false;
  }
  showPointsInterest(){
      this.flagFilterSelection = true;
      this.flagOperationStatus = false;
      this.flagPointsInterest = true;
      this.flagTypeVehicle = false;
      this.flagServiceStatus = false;
  }
  showTypeVehicle(){
      this.flagFilterSelection = true;
      this.flagOperationStatus = false;
      this.flagPointsInterest = false;
      this.flagTypeVehicle = true;
      this.flagServiceStatus = false;
  }
  showServiceStatus(){
      this.flagFilterSelection = true;
      this.flagOperationStatus = false;
      this.flagPointsInterest = false;
      this.flagTypeVehicle = false;
      this.flagServiceStatus = true;
  }

}
