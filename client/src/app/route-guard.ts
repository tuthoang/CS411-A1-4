import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Injectable()
export class RouteGuard implements CanActivate {

  constructor(private authService: AuthService, public router : Router) {}

  canActivate() {
    if(this.authService.isAuthenticated()) return true;
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
