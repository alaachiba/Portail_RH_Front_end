
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminpagesRoutingModule } from './adminpages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { NbIconModule, NbMenuModule, NbCardModule, NbInputModule, NbSelectModule, NbButtonModule } from '@nebular/theme';
import { AdminpagesComponent } from './adminpages.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListDemandeInfoComponent } from './list-demande-info/list-demande-info.component';
import { ListDemandeCongeComponent } from './list-demande-conge/list-demande-conge.component';
import { ListAvanceSalaireComponent } from './list-avance-salaire/list-avance-salaire.component';
import { ListDemaideFraisComponent } from './list-demaide-frais/list-demaide-frais.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CongeTypeComponent } from './conge-type/conge-type.component';
import { UploadComponent } from './upload/upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfileUserComponent } from './profile-user/profile-user.component';

@NgModule({
  declarations: [AdminpagesComponent, ListUsersComponent, ListDemandeInfoComponent, ListDemandeCongeComponent, ListAvanceSalaireComponent, ListDemaideFraisComponent, CongeTypeComponent, UploadComponent, ProfileUserComponent],
  imports: [
    CommonModule,
    AdminpagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbIconModule,
    NbCardModule,
    NbInputModule,
    Ng2SmartTableModule,
    FileUploadModule,
    NbSelectModule,
    FormsModule,
    NbButtonModule,
    ReactiveFormsModule,
     FormsModule,
  ]
})
export class AdminpagesModule { }
