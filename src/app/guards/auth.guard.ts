import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import {LoginService} from '../services/login/login.service';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService, private http: Http,  private route: ActivatedRoute) { }

  canActivate() {
    if (this.loginService.isLoggedIn) {
      return true;
    } else {
      this.http.get('http://localhost:8080/auth/refresh').catch( res => {
        this.loginService.isLoggedIn = false;
        this.router.navigate(['/login']);
        return Observable.throw(res.json());
      }).subscribe(res => {
        const data = res.json();
        if (data.access_token !== null) {
          this.loginService.isLoggedIn = true;
          this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
          return true;
        } else {
          this.loginService.isLoggedIn = false;
          this.router.navigate(['/login']);
          return false;
        }
      });
    }
    this.router.navigate(['/login']);
    return false;
  }
}
