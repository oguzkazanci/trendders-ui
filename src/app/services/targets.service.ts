import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Targets } from '../dto/targets';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TargetsService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private subjectUrl = this.authService.baseUrl + '/api/targets';

  getHttpOptions(): any {
    const jwtToken = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }

  getTargets(type: number, studentId: number, date: Date): Observable<any> {
    const url = `${this.subjectUrl}/${type}/${studentId}/${date}`;
    return this.httpClient.get<Targets[]>(url, this.getHttpOptions());
  }

  getTotalWorkTime(studentId: number, date: Date): Observable<any> {
    const url = `${this.subjectUrl}/getTotalWorkTime/${studentId}/${date}`;
    return this.httpClient.get<Number>(url, this.getHttpOptions());
  }

  getTotalSolvedQuestion(studentId: number, date: Date): Observable<any> {
    const url = `${this.subjectUrl}/getTotalSolvedQuestion/${studentId}/${date}`;
    return this.httpClient.get<Number>(url, this.getHttpOptions());
  }

  addTarget(target: Targets): Observable<any> {
    const url = `${this.subjectUrl}/save`;
    return this.httpClient.post<Targets>(url, target, this.getHttpOptions());
  }
}
