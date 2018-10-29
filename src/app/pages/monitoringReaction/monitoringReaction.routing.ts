import {Routes, RouterModule} from "@angular/router";
import {MonitoringReactionComponent} from "./monitoringReaction.component";
import {ModuleWithProviders} from "@angular/core";
import { ChatComponent } from './components/chat';
/**
 * Created by Tech Group BWL on 25/06/2018.
 */
const routes: Routes = [{
  path: '',
  component: MonitoringReactionComponent,
  // children: []
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
