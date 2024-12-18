import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { User } from '../_model/user';
import { LoginResponse } from '../_model/login-response';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string | null;
  private loggedInUsername: string | null;
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { 
    this.token = '';
    this.loggedInUsername = '';
  }
  public login(credenciales: {username?: string, password?: string}): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(`${api_dwb_uri}/login`, credenciales, { observe: 'response' });
  }
  public register(user: User): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${api_dwb_uri}/user`, user);
  }
  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');    
  }
  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }
  public addUserToLocalCache(loginResponse: LoginResponse): void {
    localStorage.setItem('user', JSON.stringify(loginResponse));
  }
  public getUserFromLocalCache(): User | null {
    
    let usuarioCache = localStorage.getItem('user');
    if(usuarioCache !== null){
      return JSON.parse(usuarioCache);
    }
    return null;
  }
  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }
  public getToken(): string | null{
    return this.token;
  }
  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return false;
  }
}