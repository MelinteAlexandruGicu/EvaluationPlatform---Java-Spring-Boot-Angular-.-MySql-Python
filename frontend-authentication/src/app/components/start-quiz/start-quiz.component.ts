import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { EvaluationStudentService } from 'src/app/services/evaluation-student.service';
import { HandleQuestionService } from 'src/app/services/handle-question.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  public questions: any = [];
  public currentQuestion: number = 0;
  public grade: number  = 1;
  public timer: number  = 10;
  public interval$: any; // $ means observable
  public noTime: boolean = false;
  public correct: number  = 0;
  public wrong: number  = 0;
  public quizDone: boolean = false;
  public username: string = '';
  public firstname: string = '';
  public lastname: string = '';
  public typeOfEvaluation: string = 'eval1';
  public email: string = '';

  constructor(private _handleQuestion: HandleQuestionService, private _router: Router, private _tokenStorageService: TokenStorageService,
              private _evaluationStudent: EvaluationStudentService) { }

  ngOnInit(): void {
    this.getData("eval1.json");
    this.startTimer();
    const user = this._tokenStorageService.getUser();
    this.username = user.username;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
  }

  public getTime() {
    return this.noTime;
  }

  public getData(data: string) {
    this._handleQuestion.getEvaluation(data).subscribe(result => {
      this.questions = result.questions;
    })
  }

  public nextQuestion() {
    this.currentQuestion ++;
    console.log(this.questions.length);
    if (this.currentQuestion > this.questions.length - 1) {
      this.currentQuestion = this.questions.length - 1;
    }
  }

  public evaluate(questionNr: number, answer: any, answersList: any) {
    if(Object.keys(answer).toString() == Object.keys(answersList[0]).toString()) {
      this.grade += 1.8;
      this.correct++;
    }
    else {
      this.wrong++;
    }
    if(questionNr == this.questions.length) {
      this.quizDone = true;
      this.submitQuiz();
    }
    else {
      this.currentQuestion++;
    }
    
    this._handleQuestion.setGrade(this.grade);
  }

  public startTimer() {
    this.interval$ = interval(1000).subscribe(
      result => {
        this.timer--;
        if(this.timer === 0) {
          this.submitQuiz();
          this.noTime = true;
        }
      });
  }

  public submitQuiz() {
    console.log("times up");
    this.interval$.unsubscribe();
    this.timer = 0;
    const student = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      grade: this.grade,
      evaluationType: this.typeOfEvaluation
    };
    this._evaluationStudent.saveToCatalog(student).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
}
