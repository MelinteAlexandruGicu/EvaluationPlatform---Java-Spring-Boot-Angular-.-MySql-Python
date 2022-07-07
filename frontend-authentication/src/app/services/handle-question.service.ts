import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleQuestionService {

  // public grade: number = 1;
  public correct: number = 0;
  public wrong: number = 0;
  public feedback: any;
  constructor(private http: HttpClient) { }

  // public getEvaluation(evaluationName: string) {
  //   console.log(evaluationName);
  //   return this.http.get<any>("assets/evaluations/" + evaluationName);
  // }

  public getFeedback() {
    this.feedback = [this.correct, this.wrong]
    return this.feedback;
  }

  public setFeedback( correct: number, wrong: number) {
    // this.grade = grade;
    this.correct = correct;
    this.wrong = wrong;
  }
}
