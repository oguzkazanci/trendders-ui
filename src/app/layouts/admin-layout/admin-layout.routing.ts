import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { StudentsComponent } from 'src/app/pages/students/students.component';
import { StuRegistryComponent } from 'src/app/pages/stu-registry/stu-registry.component';
import { StuTrackingComponent } from 'src/app/pages/stu-tracking/stu-tracking.component';
import { AppointmentsComponent } from 'src/app/pages/appointments/appointments.component';
import { LessonsComponent } from 'src/app/pages/lessons/lessons.component';
import { AccountingComponent } from 'src/app/pages/accounting/accounting.component';
import { TeacherRegistryComponent } from 'src/app/pages/teacher-registry/teacher-registry.component';
import { CompanyDetailsComponent } from 'src/app/pages/company-details/company-details.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'main-page',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'students',          component: StudentsComponent },
    { path: 'stu-registry',          component: StuRegistryComponent },
    { path: 'stu-tracking',          component: StuTrackingComponent },
    { path: 'appointments',          component: AppointmentsComponent },
    { path: 'lessons',          component: LessonsComponent },
    { path: 'accounting',           component: AccountingComponent },
    { path: 'teacher-registry',           component: TeacherRegistryComponent },
    { path: 'company-details',   component: CompanyDetailsComponent }
];
