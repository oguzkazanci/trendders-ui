import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    style: string;
    roles: string[];
}
declare interface RouteInfoNavBar {
    path: string;
    title: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/main-page', title: 'Ana Sayfa',  icon: 'ni-tv-2', class: '', style:'#0055f1', roles:["ADMIN", "MANAGER", "TEACHER"] },
    { path: '/students', title: 'Öğrenci İşleri',  icon:'fas fa-user-graduate', class: '', style:'#4cab11', roles:["ADMIN", "MANAGER", "TEACHER"] },
    { path: '/stu-tracking', title: 'Öğrenci Takip',  icon:'fas fa-tasks', class: '', style:'#a40040', roles:["ADMIN", "MANAGER", "TEACHER"] },
    { path: '/appointments', title: 'Dersler',  icon:'fas fa-calendar', class: '', style:'#145a84', roles:["ADMIN", "MANAGER", "TEACHER"] },
    { path: '/accounting', title: 'Muhasebe',  icon:'fas fa-calculator', class: '', style:'#127265', roles:["ADMIN", "MANAGER"] },
    { path: '/lessons', title: 'Kitaplık',  icon:'fas fa-book', class: '', style:'#57b27e', roles:["ADMIN", "MANAGER"] },
    { path: '/teacher-registry', title: 'Öğretmen Kayıt',  icon:'fas fa-user-tie', class: '', style:'#b45f18', roles:["ADMIN", "MANAGER"] }
    //{ path: '/user-profile', title: 'Profilim',  icon:'ni-single-02', class: '', style:'#f79c23' },
    //{ path: '/login', title: 'Login',  icon:'ni-key-25', class: '', style:'#ffe543' },
    //{ path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '', style:'' }
];
export const ROUTESNavBar: RouteInfoNavBar[] = [
    { path: '/main-page', title: 'Ana Sayfa' },
    { path: '/students', title: 'Öğrenci İşleri' },
    { path: '/stu-tracking', title: 'Öğrenci Takip' },
    { path: '/appointments', title: 'Dersler' },
    { path: '/accounting', title: 'Muhasebe' },
    { path: '/lessons', title: 'Kitaplık' },
    { path: '/teacher-registry', title: 'Öğretmen Kayıt' },
    { path: '/user-profile', title: 'Profilim' },
    { path: '/company-details', title: 'Firma Bilgileri' },
    { path: '/login', title: 'Giriş' },
    { path: '/register', title: 'Kayıt' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[] = [];
  public companies: any[] = [];
  public isCollapsed = true;
  selectedCompany: string;
  selectedSeason: number;
  public seasons: any[] = [
    {
      seasonId: 0,
      startDate: '2024-08-01T00:00:00.000Z',
      endDate: '2025-07-31T23:59:59.000Z',
      description: '2024-2025',
    },
    {
      seasonId: 1,
      startDate: '2025-08-01T00:00:00.000Z',
      endDate: '2026-07-31T23:59:59.000Z',
      description: '2025-2026',
    },
    {
      seasonId: 2,
      startDate: '2026-08-01T00:00:00.000Z',
      endDate: '2027-07-31T23:59:59.000Z',
      description: '2026-2027',
    },
    {
      seasonId: 3,
      startDate: '2027-08-01T00:00:00.000Z',
      endDate: '2028-07-31T23:59:59.000Z',
      description: '2027-2028',
    },
  ];

  constructor(private router: Router, private authService: AuthService, private sharedService: SharedService,
    private apiService: ApiService) {
  }

  ngOnInit() {
    this.authService.getCompany().forEach(company => {
      this.companies.push(company);
      if (this.sharedService.getCompanyId() == null) {
        this.sharedService.setCompanyId(this.companies[0].companyId);
      } else {
        this.selectedCompany = this.sharedService.getCompanyId();      
      }
    })

    ROUTES.filter(menuItem => {
      const menuItemRoles = new Set(menuItem.roles);
      for (let menuItemRole of menuItemRoles) {
        if (this.authService.getUserRole().includes(menuItemRole)) {
          this.menuItems.push(menuItem);
          break;
        }
      }
    });

    this.seasons.forEach((season) => {
      const today = new Date();
      if (today >= new Date(season.startDate) && today <= new Date(season.endDate)) {
        this.selectedSeason = season.seasonId;
        this.sharedService.setSeasonId(this.selectedSeason.toString());
      }
    });
    
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  
  seasonChange() {
    this.sharedService.setSeasonId(this.selectedSeason.toString());
    console.log(this.sharedService.getSeasonId());
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
}
