import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Subject } from '../dto/subject';
import { AuthService } from './auth.service';
import { SubjectRequest } from '../dto/request/subject-request';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private subjectUrl = this.authService.baseUrl + '/api/subjects';

  getHttpOptions(): any {
    const jwtToken = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }

  getSubjects(): Observable<any> {
    return this.httpClient.get<Subject[]>(this.subjectUrl, this.getHttpOptions());
  }
  
  getSubjectByLessonId(lessonId: number): Observable<any> {
    const url = `${this.subjectUrl}/getByLessonId/${lessonId}`;
    return this.httpClient.get<Subject[]>(url, this.getHttpOptions());
  }
  
  getSubjectByLessonIdAndGradeId(subReq: SubjectRequest): Observable<any> {
    const url = `${this.subjectUrl}/getSubjectByLessonIdAndGradeId`;
    return this.httpClient.post<Subject[]>(url, subReq, this.getHttpOptions());
  }

  addSubject(subject: Subject): Observable<any> {
    const url = `${this.subjectUrl}/add`;
    return this.httpClient.post<Subject>(url, subject, this.getHttpOptions());
  }

  deleteSubject(subjectId: number): Observable<any> {
    const url = `${this.subjectUrl}/remove/${subjectId}`;
    return this.httpClient.delete<Subject>(url, this.getHttpOptions());
  }

  changePosition(subjectId: number, oldPosition: number, newPosition: number): Observable<string> {
    const url = `${this.subjectUrl}/${subjectId}/position`;

    const params = new HttpParams()
      .set('oldPosition', oldPosition.toString())
      .set('newPosition', newPosition.toString());

    return this.httpClient.put<string>(url, {}, this.getHttpOptionsWithParams(params));
  }


  private getHttpOptionsWithParams(params: HttpParams): { headers: HttpHeaders, params: HttpParams } {
    const jwtToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
    });

    return {
      headers: headers,
      params: params
    };
  }
}
