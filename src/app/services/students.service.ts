import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Students } from '../dto/students';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';
import { Enrollment } from '../dto/enrollment';
import { Package } from '../dto/package';
import { NormalEnrollment } from '../dto/normal-enrollment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private sharedService: SharedService) { }

  private studentsUrl = this.authService.baseUrl + '/api/students';

  getHttpOptions(): any {
    const jwtToken = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }

  getHttpOptionsForPdf(): any {
    const jwtToken = this.authService.getToken();
    return {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/pdf',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }

  getStudent(id: number): Observable<any> { 
    const url = `${this.studentsUrl}/getByID/${id}`;
    return this.httpClient.get<Students>(url, this.getHttpOptions());
  }

  getStudents(): Observable<any> {
    const url = `${this.studentsUrl}/${this.sharedService.getCompanyId()}`;
    return this.httpClient.get<Students[]>(url, this.getHttpOptions());
  }

  getStudentsByRegState(state: number): Observable<any> {
    const url = `${this.studentsUrl}/state/${state}/${this.sharedService.getCompanyId()}`;
    return this.httpClient.get<Students[]>(url, this.getHttpOptions());
  }

  saveStudent(student: Students): Observable<any> {
    const url = `${this.studentsUrl}/save/${this.sharedService.getCompanyId()}`;
    return this.httpClient.post<Students>(url, student, this.getHttpOptions()).pipe(
    tap(_ => this.log(`addStudent worked!`)),
    catchError(this.handleError<Students>('saveStudent : '))
  );
  }

  deleteStudent(id: number): Observable<any> {
    const url = `${this.studentsUrl}/remove/${id}`;
    return this.httpClient.delete<Students>(url, this.getHttpOptions()).pipe(
      tap(_ => this.log(`deleteStudent Worked`)),
      catchError(this.handleError<Students>('deleteStudent : '))
    );
  }

  getSizeOfStudents(): Observable<any> {
    const url = `${this.studentsUrl}/getSizeOfStudents/${this.sharedService.getCompanyId()}`;
    return this.httpClient.get<number>(url, this.getHttpOptions());
  }

  getPackages(): Observable<any> {
    const url = `${this.studentsUrl}/getPackages`;
    return this.httpClient.get<Package[]>(url, this.getHttpOptions());
  }

  savePackage(pack: Package): Observable<any> {
    const url = `${this.studentsUrl}/savePackage`;
    return this.httpClient.post<Package>(url, pack, this.getHttpOptions())
  }

  getEnrollmentsByStudent(student: Students): Observable<any> {
    const url = `${this.studentsUrl}/getEnrollmentsByStudent/${student.studentId}`;
    return this.httpClient.get<any>(url, this.getHttpOptions());
  }

  getNEnrollmentsByStudent(studentId: number): Observable<any> {
    const url = `${this.studentsUrl}/getNEnrollmentsByStudent/${studentId}`;
    return this.httpClient.get<any>(url, this.getHttpOptions());
  }

  getEnrollment(enrollmentId: number): Observable<any> {
    const url = `${this.studentsUrl}/getEnrollment/${enrollmentId}`;
    return this.httpClient.get<Enrollment>(url, this.getHttpOptions());
  }

  getNormalEnrollment(nEnrollmentId: number): Observable<any> {
    const url = `${this.studentsUrl}/getEnrollment/${nEnrollmentId}`;
    return this.httpClient.get<NormalEnrollment>(url, this.getHttpOptions());
  }

  saveEnrollment(enrollment: Enrollment): Observable<any> {
    const url = `${this.studentsUrl}/saveEnrollment/${this.sharedService.getCompanyId()}`;
    return this.httpClient.post<Enrollment>(url, enrollment, this.getHttpOptions())
  }

  saveNormalEnrollment(nEnrollment: NormalEnrollment): Observable<any> {
    const url = `${this.studentsUrl}/saveNEnrollment/${this.sharedService.getCompanyId()}`;
    return this.httpClient.post<NormalEnrollment>(url, nEnrollment, this.getHttpOptions())
  }

  downloadPDF(studentId: number) {
    const url = `${this.studentsUrl}/getRegistryPDF/${studentId}`;
    return this.httpClient.get(url, this.getHttpOptionsForPdf());
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`StudentService: ${message}`);
  }
}