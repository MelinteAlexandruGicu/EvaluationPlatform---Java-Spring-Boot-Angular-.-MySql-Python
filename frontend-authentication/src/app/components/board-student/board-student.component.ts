import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EvaluationStudentService } from 'src/app/services/evaluation-student.service';
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
  public first: boolean = false;
  public second: boolean = false;
  public final: boolean = false;
  public feedback: any;
  public feedbackFinalTest: any;
  public feedbackFirstTest: any;
  public feedbackSecondTest: any;
  public username: string = '';
  public typeOfEvaluation: string = '';
  public grade: number = 1;
  
  constructor(private _uploadService: FileUploadService, public dialog: MatDialog, private _handleQuestion: HandleQuestionService, private _tokenStorageService: TokenStorageService,
    private _evaluationStudent: EvaluationStudentService) { }
  
  ngOnInit(): void {
    this.appsInfos = this._uploadService.viewAppsFromStorage();
    this.coursesInfos = this._uploadService.viewCoursesFromStorage();
    const user = this._tokenStorageService.getUser();
    this.username = user.username;
    let feedbackLocalStorage = this.getFeedbackFromLocalStorage(this.username, 'firstEvaluation');
    console.log(feedbackLocalStorage)
    if(feedbackLocalStorage != null){
      feedbackLocalStorage = feedbackLocalStorage.replace('[', '');
      feedbackLocalStorage = feedbackLocalStorage.replace(']', '');
      this.feedbackFirstTest = feedbackLocalStorage.split(",") as Array<String>;
    }
    feedbackLocalStorage = this.getFeedbackFromLocalStorage(this.username, 'secondEvaluation');
    console.log(feedbackLocalStorage)
    if(feedbackLocalStorage != null){
      feedbackLocalStorage = feedbackLocalStorage.replace('[', '');
      feedbackLocalStorage = feedbackLocalStorage.replace(']', '');
      this.feedbackSecondTest = feedbackLocalStorage.split(",") as Array<String>;
    }
    
    feedbackLocalStorage = this.getFeedbackFromLocalStorage(this.username, 'finalEvaluation');
    console.log(feedbackLocalStorage)
    if(feedbackLocalStorage != null){
      feedbackLocalStorage = feedbackLocalStorage.replace('[', '');
      feedbackLocalStorage = feedbackLocalStorage.replace(']', '');
      this.feedbackFinalTest = feedbackLocalStorage.split(",") as Array<String>;
    }
  }

  public openDialogQuiz(evaluation: string): void {
    const dialogRef = this.dialog.open(StartQuizComponent, {
      width: '1450px',
      height: '1020px',
    });

    if(evaluation === "first") {
      this.typeOfEvaluation = "firstEvaluation";
    }

    if(evaluation === "second") {
      this.typeOfEvaluation = "secondEvaluation";
    }

    if(evaluation === "final") {
      this.typeOfEvaluation = "finalEvaluation";
    }

    this._evaluationStudent.setTypeOfEvaluation(this.typeOfEvaluation);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogClosed = true;
      localStorage.setItem('oneAttempt' + this.typeOfEvaluation + this.username, JSON.stringify(this.dialogClosed));
      this.feedback = this._handleQuestion.getFeedback();
      localStorage.setItem('feedback' + this.typeOfEvaluation + this.username, JSON.stringify(this.feedback));
      
      let feedbackLocalStorage = this.getFeedbackFromLocalStorage(this.username, 'firstEvaluation');
      console.log(feedbackLocalStorage)
      if(feedbackLocalStorage != null){
        feedbackLocalStorage = feedbackLocalStorage.replace('[', '');
        feedbackLocalStorage = feedbackLocalStorage.replace(']', '');
        this.feedbackFirstTest = feedbackLocalStorage.split(",") as Array<String>;
      }
      feedbackLocalStorage = this.getFeedbackFromLocalStorage(this.username, 'secondEvaluation');
      console.log(feedbackLocalStorage)
      if(feedbackLocalStorage != null){
        feedbackLocalStorage = feedbackLocalStorage.replace('[', '');
        feedbackLocalStorage = feedbackLocalStorage.replace(']', '');
        this.feedbackSecondTest = feedbackLocalStorage.split(",") as Array<String>;
      }
      
      feedbackLocalStorage = this.getFeedbackFromLocalStorage(this.username, 'finalEvaluation');
      console.log(feedbackLocalStorage)
      if(feedbackLocalStorage != null){
        feedbackLocalStorage = feedbackLocalStorage.replace('[', '');
        feedbackLocalStorage = feedbackLocalStorage.replace(']', '');
        this.feedbackFinalTest = feedbackLocalStorage.split(",") as Array<String>;
      }
        
    });
  }

  public getOneAttemptFromLocalStorage(username: string, evaluation: string) {
    return localStorage.getItem('oneAttempt' + evaluation + username);
  }

  public getFeedbackFromLocalStorage(username: string, evaluation: string) {
    return localStorage.getItem('feedback' + evaluation + username);
  }

  
}
