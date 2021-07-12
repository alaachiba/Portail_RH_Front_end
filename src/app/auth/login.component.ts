import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  NbAuthSocialLink,
  NbAuthService,
  NB_AUTH_OPTIONS,
  getDeepFromObject,
  NbAuthResult,
  NbLoginComponent,
  NbAuthJWTToken,
} from "@nebular/auth";
import { TokenStorageService } from "./token-storage.service";

@Component({
  selector: "nb-login",
  templateUrl: "./login.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent {
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

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
   // console.log(this.user);

    this.service
      .authenticate(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;
        
        if (result.isSuccess()) {
          this.messages = result.getMessages();
         // console.log(result);
          this.authService
            .onTokenChange()
            .subscribe((token: NbAuthJWTToken) => {
              if (token.isValid()) {
                this.user = token.getPayload();
                console.log(this.user.sub);
                this.tokenStorage.saveToken(token.getValue());
                this.tokenStorage.saveRole(token.getPayload().roles[0].authority);
                if (this.user.roles[0].authority==="ROLE_ADMIN"){
                  return this.router.navigateByUrl("/admin/list-user");
                }else{
                  return this.router.navigateByUrl("/pages/profile");
                }
                
              }
            });
        } else {
          this.errors = result.getErrors();
        }
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
