import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationData } from '../models/UserRegistrationData.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(user: UserRegistrationData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  setUser(userData: any) {
    //localStorage.setItem('access_token', token);
    localStorage.setItem('access_token', userData.token['accessToken']);
    const name: string = `${userData.user['first_name']} ${userData.user['last_name']}`;
    localStorage.setItem('user_name', name);
  }

  getUserName():string{
    return localStorage.getItem('user_name');
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn() {
    return this.getAccessToken() !== null;
  }
}
