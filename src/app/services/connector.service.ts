import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

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

  // Account
  register = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/api/register`, postData, true);
  }

  login = (credentials): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/api/authenticate`, credentials, true);
  }

  verify = (token): Observable<any> => {
    return this.apiService.get(`${this.API_URL}/api/verify?token=${token}`, true);
  }

  logout = (): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/api/logout`, {})
  }

  forgot = (email): Observable<any> => {
    return this.apiService.get(`${this.API_URL}/api/forgot?email=${email}`, true);
  }

  reset = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/api/reset`, postData, true);
  }

  // To be done
  deactivate = (putData): Observable<any> => {
    return this.apiService.put(`${this.API_URL}/api/deactivate`, putData);
  }


  // Rhymes
  getRhymesPosts = (): Observable<any> => {
    return this.apiService.get(`${this.API_URL}/rhymes`);
  }

  postRhymes = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/rhymes`, postData);
  }

  // Users

  // Should return an array of friends and other online users
  // Will have a friend request property
  getOnlineUsers = (): Observable<any> => {
    return this.apiService.get(`${this.API_URL}/api/users`);
  }

  addFriend = (): Observable<any> => {
    return this.apiService.put(`${this.API_URL}/api/users`, {});
  }

  respondToFriendRequest = (): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/api/users`, {});
  }

  removeFriend = (): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/api/users`, {});
  }


  // Trolls
  getTrollPosts = (query): Observable<any> => {
    return this.apiService.get(`${this.API_URL}/trolls?${query}`);
  }

  postTrollPost = (postData): Observable<any> => {
    return this.apiService.post(`${this.API_URL}/trolls`, postData);
  }
}
