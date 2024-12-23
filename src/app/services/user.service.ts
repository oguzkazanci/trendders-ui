import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserDetails } from '../dto/user-details';
import { BaseResponse } from '../dto/response/base-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }  

  private userUrl = this.authService.baseUrl + '/api/user';

  getHttpOptions(): any {
    const jwtToken = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }

  getUserDetails(): Observable<any> {
    const url = `${this.userUrl}/getUserDetails`;
    return this.httpClient.get<UserDetails>(url, this.getHttpOptions());
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const url = `${this.userUrl}/changePassword/${oldPassword}/${newPassword}`;
    return this.httpClient.post<BaseResponse>(url, "", this.getHttpOptions());
  }

}
