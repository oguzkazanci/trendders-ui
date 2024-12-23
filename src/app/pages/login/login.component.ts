import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserRequest } from 'src/app/dto/request/user-request';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginRequest: UserRequest;
  loginError: boolean = false;
  loginErrorMessage: string = '';
  rmCheck: boolean = false;

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {
    this.loginRequest = new UserRequest();

    if (localStorage.checkbox == "true") {
      this.loginRequest.username = localStorage.username;
      this.loginRequest.password = "";
      this.rmCheck = true;
    } else {
      this.loginRequest.username = "";
      this.loginRequest.password = "";
      this.rmCheck = false;
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.rmCheck == true) {
      localStorage.username = this.loginRequest.username;
      localStorage.checkbox = true;
    } else {
      localStorage.username = "";
      localStorage.checkbox = false;
    }

    this.apiService.login(this.loginRequest).subscribe(
      (response) => {
        if (this.authService.isLoggedIn()){
          this.router.navigate(['/main-page']);
        }
      },
      (error) => {
        console.error('Giriş işlemi başarısız:', error);
        this.loginError = true;
        this.loginErrorMessage = '*Kullanıcı adı veya şifre hatalı.';
      }
    );
  }

}
