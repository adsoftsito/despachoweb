import { NgModule } from '@angular/core';
import { routing } from './m_travel.routing';
import { MTravelComponent } from './m_travel.component';
import { NgaModule } from '../../theme/nga.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/data_table.component';
import { CardOperative } from './components/card_operative_cicle/card_operative_cicle.component';
import { CardOrders } from './components/card_orders/card_orders.component';
import { DirectionsMapDirective } from './components/table/directionsMapDirective.component';
import {environment} from "../../../environments/environment";
// ag-grid
import { AgGridModule } from 'ag-grid-angular/main';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// maps
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

const GOOGLE_MAPS_KEY: string = environment.googleMapsKey;
@NgModule({
    declarations: [
      TableComponent,
      CardOperative,
      CardOrders,
      MTravelComponent,
      DirectionsMapDirective,
    ],
    imports: [
        routing,
        NgaModule,
        CommonModule,
        FormsModule,
        NgbModule,
        AgGridModule.withComponents([]),
        AgmCoreModule.forRoot({
          apiKey: GOOGLE_MAPS_KEY
        })
    ],
    providers: [GoogleMapsAPIWrapper],
    bootstrap: [TableComponent],
})

export class MTravelModule {}
