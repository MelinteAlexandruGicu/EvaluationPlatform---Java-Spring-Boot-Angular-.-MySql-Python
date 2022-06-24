import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardStudentComponent } from './components/board-student/board-student.component';
import { BoardTeacherComponent } from './components/board-teacher/board-teacher.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    pathMatch: 'full',
    data: { depth: 1}
  },
  {
    path: 'home', component: HomeComponent,
    pathMatch: 'full',
    data: { depth: 1}
  },
  {
    path:'login', component: LoginComponent,
    data: { depth: 2}
  },
  {
    path:'register', component: RegisterComponent,
    data: { depth: 2}
  },
  {
    path:'profile', component: ProfileComponent,
    data: { depth: 2}
  },
  {
    path:'student', component: BoardStudentComponent,
    data: { depth: 2}
  },
  {
    path:'admin', component: BoardAdminComponent,
    data: { depth: 2}
  },
  {
    path:'teacher', component: BoardTeacherComponent,
    data: { depth: 2}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
