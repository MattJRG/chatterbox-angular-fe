import { Injectable } from '@angular/core';
import { CurrentUser } from '../models/interfaces';
import { ConnectorSerivce } from './connector.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: CurrentUser = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private connectorService: ConnectorSerivce, private router: Router) {}

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  logout() {
    this.connectorService.logout().subscribe(response => {
      if (response.status === 200) {
        console.log('Logout successful');
        this.router.navigateByUrl('/welcome');
      } else {
        console.log('Logout failed');
      }

      this.isLoggedIn();
      localStorage.removeItem("token");
    }, error => {
      console.log('Logout failed');
      console.log(error);
      this.isLoggedIn();
    });
  }

}
