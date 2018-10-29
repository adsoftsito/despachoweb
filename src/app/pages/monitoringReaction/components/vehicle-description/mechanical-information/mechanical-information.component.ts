import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MonitoringReactionService } from '../../../montoringReaction.service';


@Component({
  selector: 'mr-mechanical-information',
  templateUrl: './mechanical-information.component.html',
  styleUrls: ['./mechanical-information.component.scss']
})
export class MonitoringReactionMechanicalInformationComponent implements OnInit, OnDestroy {

  
  @Output() openFiltering = new EventEmitter<any>();

  damper:boolean = true;
  changeClass:string = "motum-btn next chage-property-btn-right";
  changeClassModal:string = "modal-proportion";
  constructor(private _services :MonitoringReactionService) { }

  ngOnInit() {
    this.changeClassModal= "modal-proportion";
  }

  openActiveFaults(damper:boolean){
    if(damper===true){
      this.openFiltering.emit(damper);
      setTimeout(() => this.damper = false, 10);
      this.changeClass = "motum-btn next chage-property-btn-right-negative";
      this.changeClassModal= "modal-proportion1";
      
    }else{
      this.openFiltering.emit(damper);
      setTimeout(() => this.damper = true, 10);
      this.changeClass = "motum-btn next chage-property-btn-right";
      this.changeClassModal= "modal-proportion";
    }
  }

  ngOnDestroy() {
    this.openFiltering.emit(false);
  }
}
