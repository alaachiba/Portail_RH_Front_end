import { ProfileUserComponent } from './profile-user/profile-user.component';
import { AdminpagesComponent } from './adminpages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListDemaideFraisComponent } from './list-demaide-frais/list-demaide-frais.component';
import { ListDemandeInfoComponent } from './list-demande-info/list-demande-info.component';
import { ListDemandeCongeComponent } from './list-demande-conge/list-demande-conge.component';
import { ListAvanceSalaireComponent } from './list-avance-salaire/list-avance-salaire.component';
import { CongeTypeComponent } from './conge-type/conge-type.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: '',
    component:AdminpagesComponent,
    children:[
      {
        path: 'list-user',
        component: ListUsersComponent,
      },
      {
        path: 'list-demande-frais',
        component: ListDemaideFraisComponent,
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
        path: 'conge-type',
        component: CongeTypeComponent,
      },
      {
        path: 'upload',
        component: UploadComponent,
      },
      {
        path: 'profile-user/:email',
        component: ProfileUserComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminpagesRoutingModule { }
