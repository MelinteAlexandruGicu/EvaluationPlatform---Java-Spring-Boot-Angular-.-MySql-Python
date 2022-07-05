import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { EvaluationStudentService } from 'src/app/services/evaluation-student.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HandleQuestionService } from 'src/app/services/handle-question.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  public content: any;
  public correct: number  = 0;
  public currentQuestion: number = 0;
  public email: string = '';
  public firstname: string = '';
  public grade: number  = 1;
  public incrementGrade: number = 0;
  public questions: any = [];
  public timer: number  = 0;
  public interval$: any; // $ means observable
  public noTime: boolean = false;
  public wrong: number  = 0;
  public quizDone: boolean = false;
  public username: string = '';
  public lastname: string = '';
  public typeOfEvaluation: string = '';
  public questionContent: Array<{"eval": string, "content": string}> = [];
  constructor(private _handleQuestion: HandleQuestionService, private _tokenStorageService: TokenStorageService,
              private _evaluationStudent: EvaluationStudentService, private _uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.typeOfEvaluation = this._evaluationStudent.getTypeOfEvaluation();
    this.getData(this.typeOfEvaluation + ".json");
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
    this._uploadService.viewQuizzesFromStorage().subscribe(result => {
      this.content = result;
      console.log(this.content)
      this.content.forEach( (element: any) => {
        console.log("decodat: " + atob(element.content))
          this.questionContent.push({"eval": element.name, "content": atob(element.content)});
      });
      this.questionContent.forEach( (element: any) => {
        if(element.eval == data) {
          this.questions = JSON.parse(element.content).questions;
          this.timer = this.questions.length * 60
          this.incrementGrade = 9 / this.questions.length;
        };
      });
    });
    
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
      this.grade += this.incrementGrade;
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
    
    this._handleQuestion.setFeedback(this.grade, this.correct, this.wrong);
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
    
    this._evaluationStudent.setTypeOfEvaluation(this.typeOfEvaluation);
  }
}
