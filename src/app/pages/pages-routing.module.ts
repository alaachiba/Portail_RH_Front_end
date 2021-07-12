import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ListDemandeFraisComponent } from './list-demande-frais/list-demande-frais.component';
import { ListAvanceSalaireComponent } from './list-avance-salaire/list-avance-salaire.component';
import { ListDemandeCongeComponent } from './list-demande-conge/list-demande-conge.component';
import { ListDemandeInfoComponent } from './list-demande-info/list-demande-info.component';

const routes: Routes = [
  {
    path: '',
    component:PagesComponent,
    children:[
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'list-demande-frais',
        component: ListDemandeFraisComponent,
      },
      {
        path: 'list-avance-salaire',
        component: ListAvanceSalaireComponent,
      },
      {
        path: 'list-demande-conge',
        component: ListDemandeCongeComponent,
      },
      {
        path: 'list-demande-info',
        component: ListDemandeInfoComponent,
      },
      {
        path: 'modal-overlays',
        loadChildren: () => import('./modal-overlays/modal-overlays.module')
          .then(m => m.ModalOverlaysModule),
      },
    
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
