import { Component, OnInit } from '@angular/core';
import { ROUTES, ROUTESNavBar } from '../sidebar/sidebar.component';
import { Location  } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Notifications } from 'src/app/dto/notifications';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public focus;
  public listTitles: any[];
  public location: Location;
  userFullName: any;
  userRole: any;
  notSize: number = 0;
  notifications: Notifications[] = [];

  constructor(location: Location, private authService: AuthService, private apiService: ApiService, 
    private notificationsService: NotificationsService) {
    this.location = location;
    this.userFullName = this.authService.getUserFullName();
    this.userRoleTurEng(this.authService.getUserRole()[0]);
    this.getNotificationsSize();
  }

  ngOnInit() {
    this.listTitles = ROUTESNavBar.filter(listTitle => listTitle);
  }

  getTitle() {
    var title = this.location.prepareExternalUrl(this.location.path());
    if(title.charAt(0) === '#'){
        title = title.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === title){
            return this.listTitles[item].title;
        }
    }
    return 'Öğrenci Kaydı';
  }

  getPath() {
    var title = this.location.prepareExternalUrl(this.location.path());
    if(title.charAt(0) === '#'){
        title = title.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === title){
            return this.listTitles[item].path;
        }
    }
    return '/main-page';
  }

  userRoleTurEng(userRole: string) {
    if (userRole == "STUDENT") {
      this.userRole = "öğrenci";
    } else if (userRole == "ADMIN") {
      this.userRole = "admin";
    } else if (userRole == "TEACHER") {
      this.userRole = "öğretmen";
    } else if (userRole = "MANAGER") {
      this.userRole = "yönetici";
    }
  }

  logout() {
    this.apiService.signOut().subscribe({
      next: res => {
        this.authService.logout();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getNotificationsSize() {
    this.notificationsService.getNotificationsSize().subscribe(x => this.notSize = x);
  }

  getNotifications() {
    this.notificationsService.getNotifications().subscribe(x => this.notifications = x);
  }

}