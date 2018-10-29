import { Component, OnInit, Input } from '@angular/core';

/**
 * Created by Tech Group BWL on 30/07/2018.
 */

@Component({
  selector: 'mr-interest-point',
  templateUrl: './interestPoint.component.html',
  styleUrls: ['./interestPoint.component.scss']
})
export class MonitoringReactionInterestPointComponent implements OnInit {
isAutomatic: boolean = true;
  
  interestPoint: Array<any> = [];
  
  constructor() { }

  ngOnInit() {

    this.interestPoint = [
      {
        label: 'pages.monitoringreaction.toolMapControl.interestPoint.commercial',
        id: 'CO1',
        points: [
          {
            label: 'pages.monitoringreaction.toolMapControl.interestPoint.client',
            id: 'CL1',
            selected: false,
            subPoints: [
              {
                label: 'pages.monitoringreaction.toolMapControl.interestPoint.subcategory',
                id: 'CA1',
                selected: false
              },
              {
                label: 'pages.monitoringreaction.toolMapControl.interestPoint.subcategoryTwo',
                id: 'CA2',
                selected: false
              }
            ] //end subPoints interest point
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.interestPoint.controlledStops',
            id: 'CS1',
            selected: false,
            subPoints: [
              {
                label: 'pages.monitoringreaction.toolMapControl.interestPoint.stop',
                id: 'ST1',
                selected: false
              },
              {
                label: 'pages.monitoringreaction.toolMapControl.interestPoint.stopTwo',
                id: 'ST2',
                selected: false
              }
            ] //end subPoints interest point
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.interestPoint.basePoint',
            id: 'BP1',
            selected: false,
            subPoints: [
              {
                label: 'pages.monitoringreaction.toolMapControl.interestPoint.point',
                id: 'PO1',
                selected: false
              },
              {
                label: 'pages.monitoringreaction.toolMapControl.interestPoint.pointTwo',
                id: 'PO2',
                selected: false
              }
            ] //end subPoints interest point
          }
        ] //end array points
      },
      {
        label: 'pages.monitoringreaction.toolMapControl.interestPoint.prohibited',
        id: 'PRO1',
        points: [
          {
            label: 'pages.monitoringreaction.toolMapControl.interestPoint.basePointTwo',
            id: 'BPO1',
            selected: false,
            subPoints: [
              {
                label: 'pages.monitoringreaction.toolMapControl.interestPoint.base',
                id: 'BA1',
                selected: false
              }
            ] //end subPoints interest point
          }
        ] //end array points
      },
      {
        label: 'pages.monitoringreaction.toolMapControl.interestPoint.public',
        id: 'PU1',
        points: [
          {
            label: 'pages.monitoringreaction.toolMapControl.interestPoint.tollbooth',
            id: 'ST1',
            selected: false,
            subPoints: [
              {
                label: 'pages.monitoringreaction.toolMapControl.interestPoint.stand',
                id: 'STAN1',
                selected: false
              }
            ] //end subPoints interest point
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.interestPoint.serviceStations',
            id: 'SS1',
            selected: false,
            subPoints: [
              {
                label: 'pages.monitoringreaction.toolMapControl.interestPoint.station',
                id: 'SSER1',
                selected: false
              }
            ] //end subPoints interest point
          }
        ] //end array points
      }
    ]; // end array this.interestPoint
    
  }

  /**
   * select all checkboxes
   */
  selectAll( point, event){

    let flagCheck = event.target.checked;

    for(let i in this.interestPoint){

      let position = this.interestPoint[i].points.indexOf(point);
      
      if(position != -1){ // Found position of selected checkbox
        this.interestPoint[i].points[position].selected = flagCheck;

        for(let w in this.interestPoint[i].points[position].subPoints){
          this.interestPoint[i].points[position].subPoints[w].selected = flagCheck;
        }
        let nameLineCheck = this.interestPoint[i].points[position].label.substr(-3);
        document.getElementById(nameLineCheck).className = '';
      }
    } //End For interestPoint
  }

  selectCheck(point, subPoint, event){
    let flagSubPoint = event.target.checked;
    let a = 0;

    for(let i in this.interestPoint){

      while( a < this.interestPoint[i].points.length){

        let positionSP = this.interestPoint[i].points[a].subPoints.indexOf(subPoint);

        if(positionSP != -1){
          this.interestPoint[i].points[a].subPoints[positionSP].selected = flagSubPoint;
          this.validation(this.interestPoint[i].points[a].subPoints, point);
        }
        a++;
      } //End While
      a = 0;
    }//End For
  }

  /**
   * Checkbox validation to select the parent checkbox
   */
  validation(subPoints, point){
    let NoItems = subPoints.length-1;
    let NoItem = -1;

    for(let i in subPoints){

      if(subPoints[i].selected === true){
        NoItem++;
      }

      if(NoItem === -1){
        for(let x in this.interestPoint){
          let positionP = this.interestPoint[x].points.indexOf(point);

          if(positionP != -1){
            let nameLineCheck = this.interestPoint[x].points[positionP].label.substr(-3);
            document.getElementById(nameLineCheck).className = '';
          }
        }
      }else{
        if(NoItem > -1 && NoItem < NoItems){
          for(let x in this.interestPoint){
            let positionP = this.interestPoint[x].points.indexOf(point);
  
            if(positionP != -1){
              let nameLineCheck = this.interestPoint[x].points[positionP].label.substr(-3);
              document.getElementById(nameLineCheck).className = 'lineInCheckbox';
            }
          }
        }
      }
      if(NoItem === NoItems){
        for(let x in this.interestPoint){
          let positionP = this.interestPoint[x].points.indexOf(point);

          if(positionP != -1){
            let nameLineCheck = this.interestPoint[x].points[positionP].label.substr(-3);
            document.getElementById(nameLineCheck).className = '';
            this.interestPoint[x].points[positionP].selected = true;
          }
        }
      }else{
        for(let i in this.interestPoint){
          let positionP = this.interestPoint[i].points.indexOf(point);

          if(positionP != -1){
            this.interestPoint[i].points[positionP].selected = false;
          }
        }
      }
    } //End For Validation subPoints
  } //End Method Validation

}
