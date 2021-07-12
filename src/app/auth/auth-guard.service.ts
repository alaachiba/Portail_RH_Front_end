import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { Role } from '../entities/Role';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService,
    private tokenStorage:TokenStorageService, 
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const role = this.tokenStorage.getRole();
    if (role) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(role) === -1) {
          // role not authorised so redirect to home page
          if(role==Role.Admin){
            this.router.navigate(['admin/list-user']);

          }else{
            this.router.navigate(['pages/profile']);
          }

          return false;
      }

      // authorised so return true
      return true;
  }

  // not logged in so redirect to login page with the return url
  this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
  return false;


  }

  
}