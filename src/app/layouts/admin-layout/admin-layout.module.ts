import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentsComponent } from 'src/app/pages/students/students.component';
import { StuRegistryComponent } from 'src/app/pages/stu-registry/stu-registry.component';
import { StuTrackingComponent } from 'src/app/pages/stu-tracking/stu-tracking.component';
import { AppointmentsComponent } from 'src/app/pages/appointments/appointments.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserModule } from '@angular/platform-browser';
import { LessonsComponent } from 'src/app/pages/lessons/lessons.component';
import { AccountingComponent } from 'src/app/pages/accounting/accounting.component';
import { TeacherRegistryComponent } from 'src/app/pages/teacher-registry/teacher-registry.component';
import { httpInterceptorProviders } from 'src/app/helpers/http.interceptor';
import { CompanyDetailsComponent } from 'src/app/pages/company-details/company-details.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    FullCalendarModule,
    ClipboardModule,
    ToastModule,
    ConfirmDialogModule,
    CalendarModule
  ],
  exports: [
    ConfirmDialogModule,
    CalendarModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    StudentsComponent,
    StuRegistryComponent,
    AppointmentsComponent,
    AccountingComponent,
    LessonsComponent,
    StuTrackingComponent,
    TeacherRegistryComponent,
    CompanyDetailsComponent
  ],
  providers: [DatePipe, httpInterceptorProviders, ConfirmationService, MessageService],
  bootstrap: []
})

export class AdminLayoutModule {}
