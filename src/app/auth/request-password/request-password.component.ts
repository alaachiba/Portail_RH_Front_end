import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html'
})
export class RequestPasswordComponent implements OnInit {
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = "email";
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;
  imageSrc = 'assets/images/smartup.png' 


  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    private authService: NbAuthService,
    private tokenStorage:TokenStorageService,
    protected router: Router
  ) {
    this.redirectDelay = this.getConfigValue("forms.login.redirectDelay");
    this.showMessages = this.getConfigValue("forms.login.showMessages");
    this.strategy = this.getConfigValue("forms.login.strategy");
    this.rememberMe = this.getConfigValue("forms.login.rememberMe");
  }
  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
  ngOnInit(): void {
  }

}
