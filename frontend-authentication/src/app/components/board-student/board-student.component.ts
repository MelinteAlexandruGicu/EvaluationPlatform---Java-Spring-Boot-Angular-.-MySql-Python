import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HandleQuestionService } from 'src/app/services/handle-question.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { StartQuizComponent } from '../start-quiz/start-quiz.component';

@Component({
  selector: 'app-board-student',
  templateUrl: './board-student.component.html',
  styleUrls: ['./board-student.component.css']
})
export class BoardStudentComponent implements OnInit {
  public panelOpenState: boolean = true;
  public appsInfos?: Observable<any>;
  public coursesInfos?: Observable<any>;
  public dialogClosed: boolean = false;
  public grade: number = 1;
  public username: string = '';
  
  constructor(private _uploadService: FileUploadService, public dialog: MatDialog, private _handleQuestion: HandleQuestionService, private _tokenStorageService: TokenStorageService) { }
  
  ngOnInit(): void {
    this.appsInfos = this._uploadService.viewAppsFromStorage();
    this.coursesInfos = this._uploadService.viewCoursesFromStorage();
    const user = this._tokenStorageService.getUser();
    this.username = user.username;
  }


  public openDialogQuiz(): void {
    const dialogRef = this.dialog.open(StartQuizComponent, {
      width: '1450px',
      height: '1020px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogClosed = true;
      localStorage.setItem('oneAttempt' + this.username, JSON.stringify(this.dialogClosed));
      this.grade = this._handleQuestion.getGrade();
    });
  }

  public getOneAttemptFromLocalStorage(username: string) {
    // console.log(username + " din local storage");
    return localStorage.getItem('oneAttempt'+ username);
  }
}
