import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HandleQuestionService } from 'src/app/services/handle-question.service';
import { StartQuizComponent } from '../start-quiz/start-quiz.component';

@Component({
  selector: 'app-board-student',
  templateUrl: './board-student.component.html',
  styleUrls: ['./board-student.component.css']
})
export class BoardStudentComponent implements OnInit {
  public panelOpenState = true;
  appsInfos?: Observable<any>;
  coursesInfos?: Observable<any>;
  public dialogClosed = false;
  public grade: number = 1;
  
  constructor(private uploadService: FileUploadService, public dialog: MatDialog, private handleQuestion: HandleQuestionService) { }
  
  ngOnInit(): void {
    this.appsInfos = this.uploadService.viewAppsFromStorage();
    this.coursesInfos = this.uploadService.viewCoursesFromStorage();
  }


  openDialogQuiz(): void {
    const dialogRef = this.dialog.open(StartQuizComponent, {
      width: '1450px',
      height: '1020px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogClosed = true;
      localStorage.setItem('oneAttempt', JSON.stringify(this.dialogClosed));
      this.grade = this.handleQuestion.getGrade();
      localStorage.setItem('grade', JSON.stringify(this.grade));
    });
  }

  getOneAttemptFromLocalStorage() {
    return localStorage.getItem('oneAttempt');
  }
}
