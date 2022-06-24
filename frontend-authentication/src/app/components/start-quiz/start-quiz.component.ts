import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
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
  public grade = 1;
  public timer = 10;
  public interval$: any; // $ means observable
  public noTime = false;
  public correct = 0;
  public wrong = 0;
  public quizDone = false;
  public username: string = '';

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private handleQuestion: HandleQuestionService, private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getData("eval1.json");
    this.startTimer();
    const user = this.tokenStorageService.getUser();
    this.username = user.username;
  }

  public getTime() {
    return this.noTime;
  }

  public getData(data: string) {
    this.handleQuestion.getEvaluation(data).subscribe(result => {
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
    
    this.handleQuestion.setGrade(this.grade);
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
  }
}
