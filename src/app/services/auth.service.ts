import { Injectable } from '@angular/core';
import { CompanyResponse } from '../dto/response/company-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey: string = 'token';
  private refreshTokenKey: string = 'refreshToken';
  private userFullNameKey: string = 'userFullName';
  private userRoleKey: string = 'rol';
  private userCompanyKey: string = 'company';
  //public baseUrl: string = "http://localhost:8080";
  //public baseUrl: string = "https://service.trendders.com";
  //public baseUrl: string = "https://ozitre.onrender.com";
  public baseUrl: string = "https://ozitre-85b27273aea4.herokuapp.com";
  

  private token: string | null = null;
  private refreshToken: string | null = null;
  private userFullName: string | null = null;
  private userRole: string[] = [];
  private userCompany: CompanyResponse[] = [];
  
  /* private isTokenExpired(token: string) {
    const decodedToken = atob(token.split('.')[1]);
    const parsedToken = JSON.parse(decodedToken);
    const expiry = parsedToken.exp * 1000;
  
    if (parsedToken.exp === undefined || isNaN(expiry)) {
      return true;
    }
  
    return expiry < Date.now(); 
  } */

  constructor() {
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem(this.tokenKey);
    /*if (this.isTokenExpired(this.token || localStorage.getItem(this.tokenKey))) {
      this.apiService.refreshToken(this.refreshToken || localStorage.getItem(this.refreshTokenKey)).subscribe(
        (response) => {
          this.setToken(response.accessToken);
          this.setRefreshToken(response.refreshToken);
          return this.token || localStorage.getItem(this.tokenKey);
        },
        (error) => {
          console.log(error);
        });
    } else {
    } */
  }

  setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken;
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getRefreshToken(): string | null {
    return this.refreshToken || localStorage.getItem(this.refreshTokenKey);
  }

  setUserFullName(fullName: string): void {
    this.userFullName = fullName;
    localStorage.setItem(this.userFullNameKey, fullName);
  }

  getUserFullName(): string | null {
    return this.userFullName || localStorage.getItem(this.userFullNameKey);
  }

  setUserRole(role: any) {
    this.userRole.push(...role)
    localStorage.setItem(this.userRoleKey, JSON.stringify(role));
  }

  getUserRole(): string[] | null {
    const roles = JSON.parse(localStorage.getItem(this.userRoleKey));
    return this.userRole || roles ? roles : null;
  }

  setCompany(company: any) {
    this.userCompany.push(...company);
    localStorage.setItem(this.userCompanyKey, JSON.stringify(company));
  }

  getCompany(): string[] | null {
    const companies = JSON.parse(localStorage.getItem(this.userCompanyKey));
    return this.userCompany || companies ? companies : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.token = null;
    this.userFullName = null;
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshToken);
    localStorage.removeItem(this.userFullNameKey);
    localStorage.removeItem(this.userRoleKey);
    localStorage.removeItem(this.userCompanyKey);
    localStorage.removeItem('selectedCompany');
  }
}
