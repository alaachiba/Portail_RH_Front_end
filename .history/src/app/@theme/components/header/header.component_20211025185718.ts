import { TokenStorageService } from './../../../auth/token-storage.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbAuthJWTToken, NbAuthService, NbLogoutComponent, NbTokenService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent extends NbLogoutComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'corporate';

  userMenu = [ { title: 'Se déconnecter' } ];
  tag: string;
  imageSrc = 'assets/images/smartup.png'  

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private authService: NbAuthService,
    private userService: UserService,
    private layoutService: LayoutService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected tokenService: NbTokenService,
    private TokenStorageService:TokenStorageService,
    protected router:Router,
    private breakpointService: NbMediaBreakpointsService) {
      super(authService, options, router);

}

  

async logout() {
  this.router.navigateByUrl('/auth/login')
    this.tokenService.clear();
    this.TokenStorageService.signOut();
  }

  ngOnInit() {
    this.menuService.onItemClick()
    .pipe(filter(({ tag }) => tag === this.tag))
    .subscribe(bag =>{ console.log(bag.item.title)
              if(bag.item.title == 'Se déconnecter'){

                  this.logout();
              }

    });
    this.currentTheme = this.themeService.currentTheme;

    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.user = token.getPayload();
        this.TokenStorageService.saveToken(token.getValue());
        this.TokenStorageService.saveRole(token.getPayload().roles[0].authority);
       // console.log(this.user.storeid);

      //  console.log(token.getValue()) // here we receive a payload from the token and assigns it to our user variable
      }

    });

    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
      //console.log(this.user);
    });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
