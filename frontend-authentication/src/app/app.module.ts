import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule} from '@angular/material/icon';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardTeacherComponent } from './components/board-teacher/board-teacher.component';
import { BoardStudentComponent } from './components/board-student/board-student.component';
import { authInterceptorProviders } from './helpers/auth.interceptor'; 
import { HttpClientModule } from '@angular/common/http';
import { AppUploadComponent } from './components/app-upload/app-upload.component'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { CourseUploadComponent } from './components/course-upload/course-upload.component';
import { GradesCatalogComponent } from './components/grades-catalog/grades-catalog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { QuizCreatorComponent } from './components/quiz-creator/quiz-creator.component';
import { MatStepperModule } from '@angular/material/stepper'
import { MatMenuModule } from '@angular/material/menu'
import { MatDividerModule} from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { StartQuizComponent } from './components/start-quiz/start-quiz.component'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { QuizUploadComponent } from './components/quiz-upload/quiz-upload.component'
import { NgApexchartsModule } from 'ng-apexcharts';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { StatisticsComponent } from './components/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CopyrightComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardTeacherComponent,
    BoardStudentComponent,
    AppUploadComponent,
    CourseUploadComponent,
    GradesCatalogComponent,
    QuizCreatorComponent,
    StartQuizComponent,
    QuizUploadComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatStepperModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    MatRadioModule,
    NgApexchartsModule,
  ],
  providers: [authInterceptorProviders, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
