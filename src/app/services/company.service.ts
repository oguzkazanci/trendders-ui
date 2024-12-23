import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../dto/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }  

  private companyUrl = this.authService.baseUrl + '/api/company';

  getHttpOptions(): any {
    const jwtToken = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    };
  }

  getCompany(companyId: string): Observable<any> {
    const url = `${this.companyUrl}/${companyId}`;
    return this.httpClient.get<Company>(url, this.getHttpOptions());
  }

  saveCompany(company: Company): Observable<any> {
    const url = `${this.companyUrl}/save`;
    return this.httpClient.post<Company>(url, company, this.getHttpOptions());
  }
}
