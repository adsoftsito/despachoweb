import {Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild} from "@angular/core";
import {Constants} from "../../shared/providers/constants";
import {BaMenuService} from "../../theme/services/baMenu/baMenu.service";
import {EventsService} from "../../shared/providers/events";
import {MonitoringReactionService} from "./montoringReaction.service";
import { TranslateService } from "../../../../node_modules/@ngx-translate/core";
/**
 * Created by Tech Group BWL on 25/06/2018.
 */
@Component({
  selector: 'monitoring-and-reaction-component',
  templateUrl: './monitoringReaction.component.html',
  styleUrls: ['./monitoringReaction.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MonitoringReactionComponent implements OnInit, OnDestroy {

  motumCoords: any = {
    lat: 18.869296,
    lng: -97.051071
  };

  lang: string;

  private ZOOM_IN: string = 'ZOOM_IN';
  private ZOOM_OUT: string = 'ZOOM_OUT';
  @ViewChild('motumAgm')
  _el: any;

  MENU_MONITORING_REACTION = 'monitoringAndReaction';
  displayUnitMenuComponent: boolean = false;
  flagUnitDataVehicle: boolean = false;
  flagFilterin: boolean = false;
  unitMarkers: Array<any> = [];
  groups: Array<any> = [];
  unitDataVehicle: Array<any> = [];
  MR_HTML_CLASSES: any;
  isChatDetail: boolean = false;
  sendChangeIconColor: string;

  // ---------------------------
  // MAP CONFIGURATION VARIABLES
  // ---------------------------
  latitude: number = this.motumCoords.lat;
  longitude: number = this.motumCoords.lng;
  zoom: number = 14;
  zoomControl: boolean = false;
  streetViewControl: boolean = false;
  mapStyles: Array<any> = this.C.MAP_STYLES;
  currentZoom: number = this.zoom;
  colorCircleDetail: any;
  constructor(
    private C: Constants,
    private baMenuService: BaMenuService,
    private event: EventsService,
    private service: MonitoringReactionService,
    private translate: TranslateService
  ) {
    this.MR_HTML_CLASSES = this.service.MR_HTML_CLASSES;
    this.event.subscribe(this.C.EVENTS_SERVICE.SIDEBAR_MENU_ITEM_TOGGLE, () => {this.initDisplayUnitMenuComponent()});
    this.initDisplayUnitMenuComponent();
    this.event.subscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_MENU_CHANGE_CLASS, (menuName, classes) => {
      this.onChangeMenuClasses(menuName, classes);
    });
    this.event.subscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL, (options) => {
      this.onChatDetailStatus(options.status);
      this.colorCircleDetail = options.circleColor;
    });
    this.changeLenguage();
  }

  ngOnInit() {
    this.loadUnits();
  }

  ngOnDestroy() {
    this.event.unsubscribe(this.C.EVENTS_SERVICE.SIDEBAR_MENU_ITEM_TOGGLE);
    this.event.unsubscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_MENU_CHANGE_CLASS);
    this.event.unsubscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL);
  }
  onChatDetailStatus(status){
      Promise.resolve(null).then(() => {this.isChatDetail = status;});
  }
  closeChatDetail(){
    this.isChatDetail = false;
  }
  motumZoomControls(zoomType) {
    this.zoom = this.currentZoom;
    if (zoomType === this.ZOOM_IN && this.zoom < 22)
      this.zoom = this.zoom + 1;
    else if (zoomType === this.ZOOM_OUT && this.zoom > 0)
      this.zoom = this.zoom - 1;
  }

  zoomChange(currentZoom) {
    this.currentZoom = currentZoom;
  }

  initDisplayUnitMenuComponent() {
    let statusItem = this.baMenuService
      .getStatusItem(this.MENU_MONITORING_REACTION);
    if (statusItem)
      this.displayUnitMenuComponent = statusItem.status;
  }

  loadUnits() {
   
    this.service.retrieveUnits()
      .subscribe(
        res => {
          const body = JSON.parse(res['_body']);
          this.unitMarkers = body.units;
          this.groups = body.groups;
        },
        err => {
          console.error(err);
        }
      )
      
  }

  onChangeMenuClasses(menuName, classes) {
    Promise.resolve(null).then(() => {this.MR_HTML_CLASSES[menuName] = classes;});
  }

  sendUnit(unitData){
    this.unitDataVehicle = unitData;
    if(this.unitDataVehicle && this.unitDataVehicle.length > 0){
      this.flagUnitDataVehicle = true;
      this.flagFilterin = false;
      this.sendChangeIconColor = 'closeFO';
    }
  }
  openFiltering(flagFilteringOptions){
    this.flagFilterin = flagFilteringOptions;
    this.flagUnitDataVehicle = false;

    if(flagFilteringOptions){
      this.sendChangeIconColor = 'openFO';
    }else{
      this.sendChangeIconColor = 'closeFO';
    }
  }

  closeFiltering(close){
    this.sendChangeIconColor = 'closeFO';
    this.flagFilterin = close;
  }
  closeVehicleDescription(close){
    this.flagUnitDataVehicle = close;
  }

  changeLenguage(){
    this.lang = localStorage.getItem('lang');
    if(this.lang === null){
      this.translate.getBrowserLang();
    }else{
      this.translate.use(this.lang);
    }
  }


}
