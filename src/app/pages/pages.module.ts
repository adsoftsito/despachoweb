import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { TranslateModule } from '@ngx-translate/core';

import { Pages } from './pages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, NgbModule.forRoot(), AppTranslationModule, NgaModule, routing,  TranslateModule],
  declarations: [Pages]
})
export class PagesModule {
}
