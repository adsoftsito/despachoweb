import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mr-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class MonitoringReactionDisplayComponent implements OnInit {
  isAutomatic: boolean = false;
  display: Array<any> = [];
  viewMap: Array<any> = [];

  constructor() { }

  ngOnInit() {
    
    this.display = [
      {
        label: 'pages.monitoringreaction.toolMapControl.display.vehicleDisplay',
        id: 'VV1',
        points: [
          {
            label: 'pages.monitoringreaction.toolMapControl.display.showVehicleType',
            id: 'SVT1',
            selected: false,
            disabled: false,
            subPoints: [] //end sub interest point
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.display.showClusters',
            id: 'CLUS1',
            selected: false,
            disabled: false,
            subPoints: [] //end sub interest point
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.display.showTraffic',
            id: 'TRA1',
            selected: false,
            disabled: false,
            subPoints: [] //end sub interest point
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.display.showLabels',
            id: 'TAG1',
            subPoints: [
              {
                label: 'pages.monitoringreaction.toolMapControl.display.economic',
                id: 'ECO1',
                selected: true,
                disabled: true
              },
              {
                label: 'pages.monitoringreaction.toolMapControl.display.speed',
                id: 'ES1',
                selected: false,
                disabled: false
              },
              {
                label: 'pages.monitoringreaction.toolMapControl.display.operationStatus',
                id: 'EST1',
                selected: false,
                disabled: false
              },
              {
                label: 'pages.monitoringreaction.toolMapControl.display.alerts',
                id: 'ALERT1',
                selected: false,
                disabled: false
              },
              {
                label: 'pages.monitoringreaction.toolMapControl.display.messages',
                id: 'MSJ1',
                selected: false,
                disabled: false
              }
            ] //end sub interest point
          }
          

        ] //end array interest points
      }
      
    ]; // end array this.display

    this.viewMap = [
      {
        label: 'pages.monitoringreaction.toolMapControl.display.mapDisplay',
        id: 'MAP1',
        points: [
          {
            label: 'pages.monitoringreaction.toolMapControl.display.map',
            id: 'MA1',
            selected: false,
            disabled: false
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.display.satelite',
            id: 'SA1',
            selected: false,
            disabled: false
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.display.3dView',
            id: 'view3d',
            selected: false,
            disabled: false
          }
        ] //end array interest points
      }
    ]

    
  }

  selectAll(){

  }
}
