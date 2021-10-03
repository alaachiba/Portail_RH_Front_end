import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created by Alàa Chiba for SmartUp 2021
    </span>
    <div class="socials">
      <a href="https://www.facebook.com/SmartUP.tn" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://www.linkedin.com/company/smartup---groupe-3s/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
