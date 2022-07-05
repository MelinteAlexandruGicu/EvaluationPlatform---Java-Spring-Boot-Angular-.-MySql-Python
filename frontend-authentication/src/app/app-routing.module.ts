import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardStudentComponent } from './components/board-student/board-student.component';
import { BoardTeacherComponent } from './components/board-teacher/board-teacher.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'home', component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path:'login', component: LoginComponent,
  },
  {
    path:'register', component: RegisterComponent,
  },
  {
    path:'profile', component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'student', component: BoardStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'admin', component: BoardAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'teacher', component: BoardTeacherComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
