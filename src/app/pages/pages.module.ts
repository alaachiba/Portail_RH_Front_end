import { NgModule } from '@angular/core';
import { NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbMenuModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ProfileComponent } from './profile/profile.component';
import { ListDemandeInfoComponent } from './list-demande-info/list-demande-info.component';
import { ListDemandeCongeComponent } from './list-demande-conge/list-demande-conge.component';
import { ListAvanceSalaireComponent } from './list-avance-salaire/list-avance-salaire.component';
import { ListDemandeFraisComponent } from './list-demande-frais/list-demande-frais.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from './smart-table-datepicker/smart-table-datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CommonModule } from '@angular/common';
import { FormsModule as ngFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbIconModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbCardModule,
    NbInputModule,
    NbInputModule,
    Ng2SmartTableModule,
    CommonModule,
    ReactiveFormsModule,
    NbButtonModule,
    FormsModule,
    OwlDateTimeModule,
    NbSelectModule,
    OwlNativeDateTimeModule,
    ngFormsModule,
    CommonModule,
    FormsModule,
  
    NbAlertModule,
 

  ],
  declarations: [
    PagesComponent,
    ProfileComponent,
    ListDemandeInfoComponent,
    ListDemandeCongeComponent,
    ListAvanceSalaireComponent,
    ListDemandeFraisComponent,
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent,
  ],
  entryComponents: [
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent
  ],
})
export class PagesModule {
}
