import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { User } from './../models/interfaces';

@Injectable()
export class ConnectorSerivce {


  API_URL: string;
  API_Login_URL: string;

  constructor(private apiService: ApiService){
    if (window.location.hostname === 'localhost') {
      this.API_URL = 'http://localhost:5000';
      this.API_URL= 'http://localhost:3000';
      // this.API_URL = 'http://localhost:4000';
    } else {
      this.API_URL = 'https://trollfeed-api.now.sh';
    }
  }

  // Rhymes
  getRhymesPosts = (): Observable<any> => {
    return this.apiService.get(`${this.API_URL}/rhymes`);
  }

  postRhymes = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/rhymes`, postData);
  }

  // Users
  getUsers = (): Observable<any> => {
    return this.apiService.get(`${this.API_URL}/user`);
  }

  getUsersById = (id): Observable<any> => {
    return this.apiService.get(`${this.API_URL}/user`);
  }

  createUser = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/user`, postData);
  }

  // Trolls
  getTrollPosts = (): Observable<any> => {
    return this.apiService.get(`${this.API_URL}/trolls`);
  }

  postTrollPost = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/trolls`, postData);
  }

  login = (credentials): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/api/authenticate`, credentials, true);
  }

  register = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/api/register`, postData, true);
  }

  logout = (): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/api/logout`, {})
  }

  forgot = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/auth/forgot`, postData);
  }

  reset = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/auth/reset`, postData);
  }
}
