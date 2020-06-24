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
      // this.API_URL = 'http://localhost:5000';
      this.API_URL= 'http://localhost:3000';
      // this.API_URL = 'https://chatterbox-virid.vercel.app'
    } else {
      // Works but old
      // this.API_URL = 'https://chatterbox.mattjrg.vercel.app';
      // New test
      this.API_URL = 'https://angular-chat-be.vercel.app';
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
  getTrollPosts = (query): Observable<any> => {
    return this.apiService.get(`${this.API_URL}/trolls?${query}`);
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

  verify = (token): Observable<any> => {
    return this.apiService.get(`${this.API_URL}/api/verify?token=${token}`, true);
  }

  forgot = (email): Observable<any> => {
    return this.apiService.get(`${this.API_URL}/api/forgot?email=${email}`, true);
  }

  reset = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/api/reset`, postData, true);
  }
}
