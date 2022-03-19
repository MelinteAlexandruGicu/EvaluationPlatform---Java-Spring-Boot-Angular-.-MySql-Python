import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardStudentComponent } from './components/board-student/board-student.component';
import { BoardTeacherComponent } from './components/board-teacher/board-teacher.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'register', component: RegisterComponent,
  },
  {
    path:'dashboard', component: DashboardComponent
  },
  {
    path:'profile', component: ProfileComponent
  },
  {
    path:'student', component: BoardStudentComponent
  },
  {
    path:'admin', component: BoardAdminComponent
  },
  {
    path:'teacher', component: BoardTeacherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
