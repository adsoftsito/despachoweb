import { Component, OnInit, Input } from '@angular/core';
import { MTravelService } from '../../m_travel.service';
@Component({
    selector: 'card-operative',
    templateUrl: './card_operative_cicle.component.html',
    styleUrls: ['card_operative_cicle.component.css'],
})
export class CardOperative implements OnInit {

@Input() dataConfig: any;
operativeCicleConfig: any;
cardValueToShow: any[] = [];

  constructor(private mTravelService: MTravelService) {}

    ngOnInit () {
      this.generatorCard(this.dataConfig);
    }

    generatorCard(data) {
      this.operativeCicleConfig = data.operativeCicleConfig;
      for (let i = 0; i < data.operativeCicleConfig.length; i++) {
        if (data.operativeCicleConfig[i].value.length > 0) {
          this.cardValueToShow[i] = data.operativeCicleConfig[i].value;
        }else {
          this.cardValueToShow[i] = this.mTravelService.getCardValue(
            data.definitionRow, data.operativeCicleConfig[i].keyCode, data.operativeCicleConfig[i]);
        }
      }
    }

}
