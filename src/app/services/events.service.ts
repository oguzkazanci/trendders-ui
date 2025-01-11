import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Events } from '../dto/events';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';
import { EventWithPayment } from '../dto/event-with-payment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private sharedService: SharedService) { }

  private eventsUrl = this.authService.baseUrl + '/api/events';

  getHttpOptions(): any {
    const jwtToken = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }

  getEvents(): Observable<any> {
    const url = `${this.eventsUrl}/${this.sharedService.getCompanyId()}`
    return this.httpClient.get<Events[]>(url, this.getHttpOptions());
  }

  getEventsByStudentId(studentId: number, month: number): Observable<any> {
    const url = `${this.eventsUrl}/getByStudentID/${this.sharedService.getSeasonId()}/${studentId}` + '?month=' + month;
    return this.httpClient.get<EventWithPayment[]>(url, this.getHttpOptions());
  }

  getLastEventByStudentId(studentId: number): Observable<any> {
    const url = `${this.eventsUrl}/getLastEventByStudentID/${studentId}`;
    return this.httpClient.get<Events>(url, this.getHttpOptions());
  }

  getEventsByTeacherId(teacherId: number, month: number): Observable<any> {
    const url = `${this.eventsUrl}/getByTeacherID/${this.sharedService.getSeasonId()}/${teacherId}` + '?month=' + month;
    return this.httpClient.get<Events[]>(url, this.getHttpOptions());
  }

  getLastEventByTeacherId(teacherId: number): Observable<any> {
    const url = `${this.eventsUrl}/getLastEventByTeacherID/${teacherId}`;
    return this.httpClient.get<Events>(url, this.getHttpOptions());
  }

  getEventsByDateRange(startDate: string, endDate: string): Observable<any> {
    const url = `${this.eventsUrl}/${this.sharedService.getCompanyId()}/date?startDate=` + startDate + "&endDate=" + endDate;
    return this.httpClient.get<Events[]>(url, this.getHttpOptions());
  }

  addEvent(event: Events): Observable<any> {
    const url = `${this.eventsUrl}/addEvent/${this.sharedService.getCompanyId()}`;
    return this.httpClient.post<Events>(url, event, this.getHttpOptions());
  }

  updateEvent(event: Events): Observable<any> {
    const url = `${this.eventsUrl}/update`;
    return this.httpClient.post<Events>(url, event, this.getHttpOptions());
  }

  addRoutineEvent(event: Events, repeatIntervalDays: any): Observable<any> {
    const url = `${this.eventsUrl}/routineEvent/${repeatIntervalDays}/${this.sharedService.getCompanyId()}`
    return this.httpClient.post<Events>(url, event, this.getHttpOptions());
  }

  getSizeOfEvents(): Observable<any> {
    const url = `${this.eventsUrl}/getSizeOfEvents/${this.sharedService.getCompanyId()}`
    return this.httpClient.get<number>(url, this.getHttpOptions());
  }

  getLast7Events(): Observable<any> {
    const url = `${this.eventsUrl}/getLastEvents/${this.sharedService.getCompanyId()}`
    return this.httpClient.get<Events[]>(url, this.getHttpOptions());
  }
}
