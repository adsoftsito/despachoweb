import { Routes, RouterModule } from '@angular/router';
import { MTravelComponent } from './m_travel.component';

const routes: Routes = [
    {
        path: '',
        component: MTravelComponent,
    },
];
export const routing = RouterModule.forChild(routes);
