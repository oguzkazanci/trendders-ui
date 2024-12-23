import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Notifications } from '../dto/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private notificationUrl = this.authService.baseUrl + '/api/notifications';

  getHttpOptions(): any {
    const jwtToken = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }  
  
  getNotifications(): Observable<any> {
    const url = `${this.notificationUrl}/myNotifications`;
    return this.httpClient.get<Notifications[]>(url, this.getHttpOptions());
  }

  getNotificationsSize(): Observable<any> {
    const url = `${this.notificationUrl}/size`;
    return this.httpClient.get<number>(url, this.getHttpOptions());
  }

}
