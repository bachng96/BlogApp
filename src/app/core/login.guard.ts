import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private location: Location) {}

  canActivate() {
    if (this.authService.isAuthenticated()) {
      this.location.back();
      return;
    }
    return true;
  }
}
