import { NgSelectModule } from '@ng-select/ng-select';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FileUploadModule} from 'ng2-file-upload';
import * as cloudinary from 'cloudinary-core';
// Cloudinary module
import {CloudinaryModule, CloudinaryConfiguration, provideCloudinary} from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './config';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy, NbTokenLocalStorage, NbTokenStorage } from '@nebular/auth';
import { environment } from '../environments/environment';
import { AuthGuard } from './auth/auth-guard.service';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FileUploadModule,
    CloudinaryModule.forRoot(cloudinary, cloudinaryConfiguration),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies:[
        NbPasswordAuthStrategy.setup({
          name:'email',
          token : {
            class: NbAuthJWTToken,
            key:'accessToken'
          },
          baseEndpoint: environment.base,
          login : {
            endpoint: environment.login,
            method:'POST',
            redirect : {
              success:'/admin/list-user',
              failure:null,
            }
          },
          logout : {
            redirect : {
              success:'/auth/login',
              failure:null,
            }
          }
          
        })
      ],
      forms: {logout: {
        redirectDelay: 0,
      },},
    }),
    
  ],
  providers: [
    // ...
    AuthGuard,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
function observableOf(arg0: string) {
  throw new Error('Function not implemented.');
}

