import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  loginFailed = false;
  location: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router, private loginService: LoginService,
    private http: Http,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    // reset login status

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loginService.logn(this.model.username, this.model.password).catch(res => {
      const config = new MdSnackBarConfig();
      config.politeness = 'assertive';
      config.duration = 5000;
      const snackBarRef = this.snackBar.open('Login Failed.', '', config);
      return Observable.throw(res.json());
    }).subscribe(res => {
      this.loginService.isLoggedIn = true;
      this.router.navigate(['/jobs']);
    });
  }
}
