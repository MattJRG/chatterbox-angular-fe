import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { User } from './../models/interfaces';

@Injectable()
export class ConnectorSerivce {


  API_URL: string;

  constructor(private apiService: ApiService){
    if (window.location.hostname === 'localhost') {
      this.API_URL = 'http://localhost:5000';
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

  trollLogin = (credentials): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/trolls/login`, credentials);
  }

  postTrollPost = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/trolls`, postData);
  }

  // Register
  register = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/trolls/register`, postData);
  }

}
