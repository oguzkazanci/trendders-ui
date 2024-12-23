import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lessons } from '../dto/lessons';
import { Publisher } from '../dto/publisher';
import { Library } from '../dto/library';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private lessonsUrl = this.authService.baseUrl + '/api/lessons';

  private publisherUrl = this.authService.baseUrl + '/api/publisher';

  private libraryUrl = this.authService.baseUrl + '/api/library';

  getHttpOptions(): any {
    const jwtToken = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }

  getLessons(): Observable<any> {
    return this.httpClient.get<Lessons[]>(this.lessonsUrl, this.getHttpOptions());
  }

  getPublisher(): Observable<any> {
    return this.httpClient.get<Publisher[]>(this.publisherUrl);
  }

  getBooks(): Observable<any> {
    return this.httpClient.get<Library[]>(this.libraryUrl, this.getHttpOptions());
  }

  getBooksByPublisherId(publisherId: number): Observable<any> {
    const url = `${this.libraryUrl}/getByPublisherId/${publisherId}`;
    return this.httpClient.get<Library[]>(url, this.getHttpOptions());
  }

  getLessonsForBook(): Observable<any> {
    const url = `${this.lessonsUrl}/type/${1}`;
    return this.httpClient.get<Lessons[]>(url, this.getHttpOptions());
  }

  addPublisher(publisher: Publisher): Observable<any> {
    const url = `${this.publisherUrl}/save`;
    return this.httpClient.post<Publisher>(url, publisher, this.getHttpOptions());
  }

  saveBook(book: Library): Observable<any> {
    const url = `${this.libraryUrl}/save`;
    return this.httpClient.post<Library>(url, book, this.getHttpOptions());
  }

  deleteBook(bookId: number): Observable<any> {
    const url = `${this.libraryUrl}/remove/${bookId}`;
    return this.httpClient.delete<Library>(url, this.getHttpOptions());
  }

  deletePublisher(publisherId: number): Observable<any> {
    const url = `${this.publisherUrl}/remove/${publisherId}`;
    return this.httpClient.delete<Library>(url, this.getHttpOptions());
  }
}
