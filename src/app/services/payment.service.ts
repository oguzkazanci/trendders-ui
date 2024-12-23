import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../dto/payment';
import { PaymentMethods } from '../dto/payment-methods';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';
import { ExpenseRequest } from '../dto/request/expense-request';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private sharedService: SharedService) { }

  private paymentUrl = this.authService.baseUrl + '/api/payment';

  private paymentMethodUrl = this.authService.baseUrl + '/api/methods';

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

  getHttpOptionsForExcel(): any {
    const jwtToken = this.authService.getToken();
    return {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }

  getPayments(): Observable<any> {
    return this.httpClient.get<Payment[]>(this.paymentUrl, this.getHttpOptions());
  }

  savePayment(payment: Payment): Observable<any> {
    const url = `${this.paymentUrl}/savePayment/${this.sharedService.getCompanyId()}`;
    return this.httpClient.post<Payment>(url, payment, this.getHttpOptions());
  }

  updatePayment(payment: Payment): Observable<any> {
    const url = `${this.paymentUrl}/updatePayment`;
    return this.httpClient.post<Payment>(url, payment, this.getHttpOptions());
  }

  getPaymentByEventId(eventId: number, paymentType: number): Observable<any> { 
    const url = `${this.paymentUrl}/getByEventId/${eventId}/${paymentType}`;
    return this.httpClient.get<Payment>(url, this.getHttpOptions());
  }

  getPaymentByEventIdAndStatus(eventId: number, paymentType: number, paymentStatus: number): Observable<any> { 
    const url = `${this.paymentUrl}/getByEventIdAndStatus/${eventId}/${paymentType}` + '?paymentStatus=' + paymentStatus;
    return this.httpClient.get<Payment>(url, this.getHttpOptions());
  }

  getPaymentExpenses(expense: ExpenseRequest) : Observable<any> {
    const url = `${this.paymentUrl}/getExpenseTotalAmount`;
    return this.httpClient.post<Payment[]>(url, expense, this.getHttpOptions());
  }

  getPaymentMethods(): Observable<any> {
    return this.httpClient.get<PaymentMethods[]>(this.paymentMethodUrl, this.getHttpOptions());
  }
  
  getTotalAmountOfAny(type: number): Observable<any> {
    const url = `${this.paymentUrl}/${this.sharedService.getCompanyId()}/getTotalAmount/` + type;
    return this.httpClient.get<Number>(url, this.getHttpOptions());
  }

  downloadPDF(studentId: number, month: number) {
    const url = `${this.paymentUrl}/getPaymentPDF/${studentId}?month=`+ month;
    return this.httpClient.get(url, this.getHttpOptionsForPdf());
  }
  
  downloadExcel(studentId: number, month: number) {
    const url = `${this.paymentUrl}/getPaymentExcel/${studentId}?month=`+ month;
    return this.httpClient.get(url, this.getHttpOptionsForExcel());
  }
}
