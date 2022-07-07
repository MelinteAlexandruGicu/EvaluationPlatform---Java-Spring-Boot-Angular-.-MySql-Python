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
  public appsInfos?: Observable<any>;
  public coursesInfos?: Observable<any>;
  public dialogClosed: boolean = false;
  public feedback: any;
  public feedbackFinalTest: any;
  public feedbackFirstTest: any;
  public feedbackSecondTest: any;
  public gradeFirstEval: any;
  public gradeSecondEval: any;
  public gradeFinalEval: any;
  public finalGrade: number = 1;
  public panelOpenState: boolean = true;
  public typeOfEvaluation: string = '';
  public username: string = '';
  public email: string = '';

  constructor(private _uploadService: FileUploadService, public dialog: MatDialog, private _handleQuestion: HandleQuestionService, private _tokenStorageService: TokenStorageService,
    private _evaluationStudent: EvaluationStudentService) { }

  public getFeedbackFromLocalStorage(username: string, evaluation: string) {
    return localStorage.getItem('feedback' + evaluation + username);
  }

  public getOneAttemptFromLocalStorage(username: string, evaluation: string) {
    return localStorage.getItem('oneAttempt' + evaluation + username);
  }

  public getFinalGrade(email: string) {
    this._evaluationStudent.getFinalGrade(email).subscribe(
      data => {
       this.finalGrade = Math.round(data as number);
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.appsInfos = this._uploadService.viewAppsFromStorage();
    this.coursesInfos = this._uploadService.viewCoursesFromStorage();
    const user = this._tokenStorageService.getUser();
    this.email = user.email;
    this.getFinalGrade(this.email);
    this.username = user.username;
    let feedbackLocalStorage = this.getFeedbackFromLocalStorage(this.username, 'firstEvaluation');
    if(feedbackLocalStorage != null){
      feedbackLocalStorage = feedbackLocalStorage.replace('[', '');
      feedbackLocalStorage = feedbackLocalStorage.replace(']', '');
      this.feedbackFirstTest = feedbackLocalStorage.split(",") as Array<String>;
    }
    feedbackLocalStorage = this.getFeedbackFromLocalStorage(this.username, 'secondEvaluation');
    if(feedbackLocalStorage != null){
      feedbackLocalStorage = feedbackLocalStorage.replace('[', '');
      feedbackLocalStorage = feedbackLocalStorage.replace(']', '');
      this.feedbackSecondTest = feedbackLocalStorage.split(",") as Array<String>;
    }
    
    feedbackLocalStorage = this.getFeedbackFromLocalStorage(this.username, 'finalEvaluation');
    if(feedbackLocalStorage != null){
      feedbackLocalStorage = feedbackLocalStorage.replace('[', '');
      feedbackLocalStorage = feedbackLocalStorage.replace(']', '');
      this.feedbackFinalTest = feedbackLocalStorage.split(",") as Array<String>;
    }
  }

  public getFirstGrade() {
    this._evaluationStudent.getGrade(this.email, 'firstEvaluation')
      .subscribe(
        data => {
          console.log(data);
          this.gradeFirstEval = data;
        },
        error => {
          console.log(error);
        });
  }

  public getSecondGrade() {
    this._evaluationStudent.getGrade(this.email, 'secondEvaluation')
      .subscribe(
        data => {
          console.log(data);
          this.gradeSecondEval = data;
        },
        error => {
          console.log(error);
        });
  }

  public getLastGrade() {
    this._evaluationStudent.getGrade(this.email, 'finalEvaluation')
      .subscribe(
        data => {
          console.log(data);
          this.gradeFinalEval = data;
        },
        error => {
          console.log(error);
        });
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
      this.getFirstGrade();
      this.getSecondGrade();
      this.getLastGrade();
      localStorage.setItem('oneAttempt' + this.typeOfEvaluation + this.username, JSON.stringify(this.dialogClosed));
      this.feedback = this._handleQuestion.getFeedback();
      localStorage.setItem('feedback' + this.typeOfEvaluation + this.username, JSON.stringify(this.feedback));
      
      let feedbackLocalStorage = this.getFeedbackFromLocalStorage(this.username, 'firstEvaluation');
      if(feedbackLocalStorage != null){
        feedbackLocalStorage = feedbackLocalStorage.replace('[', '');
        feedbackLocalStorage = feedbackLocalStorage.replace(']', '');
        this.feedbackFirstTest = feedbackLocalStorage.split(",") as Array<String>;
      }
      feedbackLocalStorage = this.getFeedbackFromLocalStorage(this.username, 'secondEvaluation');
      if(feedbackLocalStorage != null){
        feedbackLocalStorage = feedbackLocalStorage.replace('[', '');
        feedbackLocalStorage = feedbackLocalStorage.replace(']', '');
        this.feedbackSecondTest = feedbackLocalStorage.split(",") as Array<String>;
      }
      
      feedbackLocalStorage = this.getFeedbackFromLocalStorage(this.username, 'finalEvaluation');
      if(feedbackLocalStorage != null){
        feedbackLocalStorage = feedbackLocalStorage.replace('[', '');
        feedbackLocalStorage = feedbackLocalStorage.replace(']', '');
        this.feedbackFinalTest = feedbackLocalStorage.split(",") as Array<String>;
      }
        
    });
  }
}
