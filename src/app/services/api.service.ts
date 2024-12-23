import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UserResponse } from '../dto/response/user-response';
import { UserRequest } from '../dto/request/user-request';
import { RefreshTokenResponse } from '../dto/response/refresh-token-response';
import { RefreshTokenRequest } from '../dto/request/refresh-token-request';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private authUrl = this.authService.baseUrl + '/login';
  refreshTokenReq: RefreshTokenRequest

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.refreshTokenReq = new RefreshTokenRequest();
  } 
  
  login(userReq: UserRequest): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(this.authUrl + "/signin", userReq)
      .pipe(
        map((response: UserResponse) => {
          this.authService.setUserFullName(response.username);
          this.authService.setToken(response.token);
          this.authService.setRefreshToken(response.refreshToken);
          this.authService.setUserRole(response.roles);
          this.authService.setCompany(response.companies);
          return response;
        }),
        catchError(error => {
          console.error('HTTP isteği başarısız:', error);
          throw error;
        })
      );
  }

  getWithAuthorization(url: string): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError('Token not available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(url, { headers });
  }

  refreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
    this.refreshTokenReq.refreshToken = refreshToken;
    return this.httpClient.post<RefreshTokenResponse>(this.authUrl + "/refreshtoken", this.refreshTokenReq)
    .pipe(
      map((response) => {
        this.authService.setToken(response.accessToken);
        this.authService.setRefreshToken(response.refreshToken);
        return response;
      }),
      catchError(error => {
        console.error('HTTP isteği başarısız:', error);
        throw error;
      })
    );
  }

  signOut(): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError('Token not available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post(this.authUrl + "/signout", { }, { headers });
  }
}
