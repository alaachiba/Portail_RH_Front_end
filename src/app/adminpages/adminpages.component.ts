import { Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { MENU_ITEMS } from './admin-menu';

@Component({
  selector: 'ngx-adminpages',
  styleUrls: ['adminpages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  
})
export class AdminpagesComponent  {

  constructor(iconsLibrary: NbIconLibraries) {
  
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }

  menu = MENU_ITEMS;

}
