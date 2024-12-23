import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grades } from '../dto/grades';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private gradesUrl = this.authService.baseUrl + '/api/grades';

  getHttpOptions(): any {
    const jwtToken = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }
  
  getGrades(): Observable<any> {
    return this.httpClient.get<Grades[]>(this.gradesUrl, this.getHttpOptions());
  }
}