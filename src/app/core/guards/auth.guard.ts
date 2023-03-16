import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad   {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuthState(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const url = segments.map(s => `/${s}`).join('');
    return this.checkAuthState(url)
  }
  private checkAuthState(redirect: string): boolean {
    if (!this.authService.isAuthenticated) {
        this.router.navigate(['/login'], {
          queryParams: { redirect }
        });
      }
    return this.authService.isAuthenticated;
  }
}
