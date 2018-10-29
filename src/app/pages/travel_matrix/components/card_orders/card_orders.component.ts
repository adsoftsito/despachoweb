import { Component, OnInit, Input } from '@angular/core';
import { MTravelService } from '../../m_travel.service';
@Component({
    selector: 'card-orders',
    templateUrl: './card_orders.component.html',
    styleUrls: ['card_orders.component.css'],
})
export class CardOrders implements OnInit {

@Input() ordersData: any;
ordersConfig: any;
cardValueToShow: any[] = [];

  constructor(private mTravelService: MTravelService) {}

    ngOnInit () {
      this.generatorCard(this.ordersData);
    }

    generatorCard(data) {
      this.ordersConfig = data.ordersConfig;
      for (let i = 0; i < data.ordersConfig.length; i++) {
        if ( data.ordersConfig[i].value.length > 0) {
            this.cardValueToShow[i] = data.ordersConfig[i].value;
        }else {
          this.cardValueToShow[i] = this.mTravelService.getCardValue(
            data.definitionRow, data.ordersConfig[i].keyCode, data.ordersConfig[i]);
        }
      }
    }

}
