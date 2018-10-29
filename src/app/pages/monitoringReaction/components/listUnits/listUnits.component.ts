import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges,
  OnDestroy, AfterViewInit
} from '@angular/core';
import {EventsService} from "../../../../shared/providers/events";
import {Constants} from "../../../../shared/providers/constants";
/**
 * Created by Tech Group BWL on 06/07/2018.
 */
@Component({
  selector: 'mr-list-units',
  templateUrl: './listUnits.component.html',
  styleUrls: ['./listUnits.component.scss']
})
export class MonitoringReactionListUnitsComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() listUnits = [];
  @Input() groups = [];
  @Input() changeIconColor: string;
  @Output() sendUnit = new EventEmitter<any>();
  @Output() openFiltering = new EventEmitter<any>();
  flagPointsInterest: boolean = false;
  flagFilteringOptions: boolean = false;
  sortBy = [];
  unitData = [];
  colorIndicator: Array<any> = [];

  vehicles = 'pages.monitoringreaction.listUnits.vehicles';
  allTheGroups = 'pages.monitoringreaction.listUnits.allTheGroups';
  sortByTrans = 'pages.monitoringreaction.listUnits.sortByTrans';
  search = 'pages.monitoringreaction.listUnits.search';

  //Indicator CORREGIR LAS RUTAS DE LOS ICONOS Y EL CODIGO EN EL OBJETO Q SE RECIBE
  noProblem = '../../../../../assets/img/theme/icon/monitoringReaction/noProblem.svg';
  warning = '../../../../../assets/img/theme/icon/monitoringReaction/warning.svg';
  danger = '../../../../../assets/img/theme/icon/monitoringReaction/danger.svg';
  
  codeIndicator = ['no problem','warning','danger'];
  iconIndicator = [ this.noProblem, this.warning, this.danger];

  breadcrumbLabels = ['Menu.monitoringReaction', 'general.vehicles'];
  
  constructor(
    private event: EventsService,
    private C: Constants
  ) {

  }

  ngOnInit() {

    this.loadSortBy();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.event.publish(
        this.C.EVENTS_SERVICE.BREADCRUMB_SET_MANUAL_BREAD,
        this.breadcrumbLabels
      );
    }, 500);
  }

  ngOnChanges( OnChanges: SimpleChanges){
    
    if(this.changeIconColor === 'closeFO'){
      this.flagFilteringOptions = false;
    }

    if(this.listUnits.length>0){
      for(let i=0; i<this.listUnits.length; i++){

        if(this.listUnits[i].indicator === '' || null){
          this.colorIndicator.push(null);
        }else{
          let findIndicator = this.codeIndicator.indexOf(this.listUnits[i].indicator);
          let getIconIndicator = this.iconIndicator[findIndicator];
          this.colorIndicator.push(getIconIndicator);
        }

          if((i+1) === this.listUnits.length)
              this.flagPointsInterest = true;
      }
    }

  } 

  loadSortBy(){
    this.sortBy = [
      {
        name: "pages.monitoringreaction.listUnits.Economic"
      },
      {
        name: "pages.monitoringreaction.listUnits.driver"
      },
      {
        name: "pages.monitoringreaction.listUnits.status"
      }
    ]
  }

  sendUnitData(unit){

    this.unitData = [
      {
        economicNumber : unit.economicNumber,
        group : unit.group,
        operationalState : unit.operationalState,
        state: unit.status,
        rotate: unit.directionGrade
      }
    ]
    this.sendUnit.emit(this.unitData);
  }

  openFilteringOptions(flagFilteringOptions){
    if(this.flagFilteringOptions){
      this.flagFilteringOptions = false;
      this.openFiltering.emit(this.flagFilteringOptions);
    }else{
      this.flagFilteringOptions = true;
      this.openFiltering.emit(this.flagFilteringOptions);
    }
  }
}
