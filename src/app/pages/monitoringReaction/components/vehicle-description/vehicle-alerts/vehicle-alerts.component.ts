import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mr-vehicle-alerts',
  templateUrl: './vehicle-alerts.component.html',
  styleUrls: ['./vehicle-alerts.component.scss']
})
export class  MonitoringReactionVehicleAlertsComponent implements OnInit {


  updateDate;

  constructor() { }

  ngOnInit() {
  }

  updateDataAlerts(){
    this.updateDate = new Date;
   }



  testData= [
    { "label":"Exceso límite de velocidad", "date":"24/06/18","hrs":"10:35 am", "isResolved":"resolved"},
    { "label":"Inhibidor de GPS detectado", "date":"24/06/18","hrs":"10:00 am", "isResolved":"isresolved"}
  ];

}
