import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class authGuard{

  constructor(private cookieService: CookieService, private router: Router,public userService: UserService) { 
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean{
    if(this.cookieService.get('token') && this.cookieService.get('role') == 'Admin')
      return true;
    else
      this.router.navigate(['login'])
      return false;
    }  
  };

