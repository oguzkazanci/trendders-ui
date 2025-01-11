import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookProgress } from '../dto/book-progress';
import { Observable } from 'rxjs';
import { GivenBooks } from '../dto/given-books';
import { AuthService } from './auth.service';
import { SubjectProgressRequest } from '../dto/request/subject-progress-request';
import { SubjectProgress } from '../dto/subject-progress';
import { ExamProgress } from '../dto/exam-progress';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private progressUrl = this.authService.baseUrl + '/api/progress';

  private givenBooksUrl = this.authService.baseUrl + '/api/givenbooks';

  getHttpOptions(): any {
    const jwtToken = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }

  getGivenBooksByStudentId(studentId: number): Observable<any> {
    const url = `${this.givenBooksUrl}/getByStudentId/${studentId}`;
    return this.httpClient.get<GivenBooks[]>(url, this.getHttpOptions());
  }

  getGivenBook(studentId: number, lessonId: number, gradeId: string): Observable<any> {
    const url = `${this.givenBooksUrl}/getGivenBook/${studentId}/${lessonId}/${gradeId}`;
    return this.httpClient.get<GivenBooks[]>(url, this.getHttpOptions());
  }

  getLessonsByStudentId(studentId: number): Observable<any> {
    const url = `${this.givenBooksUrl}/getLessonsByStudentId/${studentId}`;
    return this.httpClient.get<any>(url, this.getHttpOptions());
  }

  getProgressByStudentIdAndLessonId(studentId: number, lessonId: number): Observable<any> {
    const url = `${this.progressUrl}/getByStudentIdAndLessonId/${studentId}/${lessonId}`;
    return this.httpClient.get<BookProgress[]>(url, this.getHttpOptions());
  }

  getSubjectProgressByStudentIdAndFoyId(req: SubjectProgressRequest): Observable<any> {
    const url = `${this.progressUrl}/getSubjectProgressByStudentIdAndFoyId`;
    return this.httpClient.post<SubjectProgress[]>(url, req, this.getHttpOptions());
  }

  getExamProgressByStudentId(studentId: number): Observable<any> {
    const url = `${this.progressUrl}/getExamProgressByStudentId/${studentId}`;
    return this.httpClient.get<ExamProgress[]>(url, this.getHttpOptions());
  }

  addGivenBook(givenBook: GivenBooks): Observable<any> {
    const url = `${this.givenBooksUrl}/save`;
    return this.httpClient.post<GivenBooks>(url, givenBook, this.getHttpOptions());
  }

  removeGivenBook(givenBookId: number): Observable<any> {
    const url = `${this.givenBooksUrl}/remove/${givenBookId}`;
    return this.httpClient.delete<GivenBooks>(url, this.getHttpOptions());
  }

  saveBookProgress(bookTrack: BookProgress) : Observable<any> {
    const url = `${this.progressUrl}/saveBookProgress`;
    return this.httpClient.post<BookProgress>(url, bookTrack, this.getHttpOptions());
  }

  saveSubjectProgress(subProg: SubjectProgress) : Observable<any> {
    const url = `${this.progressUrl}/saveSubjectProgress`;
    return this.httpClient.post<SubjectProgress>(url, subProg, this.getHttpOptions());
  }

  saveExamProgress(examProg: ExamProgress) : Observable<any> {
    const url = `${this.progressUrl}/saveExamProgress`;
    return this.httpClient.post<ExamProgress>(url, examProg, this.getHttpOptions());
  }

  deleteExamProgress(examId: number) : Observable<any> {
    const url = `${this.progressUrl}/deleteExamProgress/${examId}`;
    return this.httpClient.delete<Boolean>(url, this.getHttpOptions());
  }
}
