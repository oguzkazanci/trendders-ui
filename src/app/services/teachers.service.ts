import { Injectable } from '@angular/core';
import { Teachers } from '../dto/teachers';
import { HttpClient, HttpHeaders, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  
  constructor(private httpClient: HttpClient, private authService: AuthService, private sharedService: SharedService) { }

  private teachersUrl = this.authService.baseUrl + '/api/teachers';

  getHttpOptions(): any {
    const jwtToken = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }

  getTeachers(): Observable<any> {
    const url = `${this.teachersUrl}/${this.sharedService.getCompanyId()}/${this.sharedService.getSeasonId()}`
    return this.httpClient.get<Teachers[]>(url, this.getHttpOptions());
  }

  saveTeacher(teacher: Teachers): Observable<any> {
    const url = `${this.teachersUrl}/save/${this.sharedService.getCompanyId()}`;
    return this.httpClient.post<Teachers>(url, teacher, this.getHttpOptions());
  }

  getTeachersByState(state: number): Observable<any> {
    const url = `${this.teachersUrl}/getByState/${state}/${this.sharedService.getCompanyId()}`;
    return this.httpClient.get<Teachers[]>(url, this.getHttpOptions());
  }

  getTeachersByLessonId(lessonId: number): Observable<any> {
    const url = `${this.teachersUrl}/getByLessonId/${lessonId}/${this.sharedService.getCompanyId()}`;
    return this.httpClient.get<Teachers[]>(url, this.getHttpOptions());
  }
}