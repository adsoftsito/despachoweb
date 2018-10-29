import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'mr-position-vehicles-and-sensors',
  templateUrl: './position-vehicles-and-sensors.component.html',
  styleUrls: ['./position-vehicles-and-sensors.component.scss']
})
export class MonitoringReactionPositionVehiclesAndSensorsComponent implements OnInit, OnChanges {

  @Input() datatoconsult:any;
  compassRose:any;

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(){
    this.compassRose = this.datatoconsult.unitInformation.currentValue[0].rotate;
  }

}
