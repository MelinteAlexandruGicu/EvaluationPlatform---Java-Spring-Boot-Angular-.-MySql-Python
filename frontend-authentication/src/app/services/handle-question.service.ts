import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleQuestionService {

  public grade: number = 0;
  constructor(private http: HttpClient) { }

  public getEvaluation(evaluationName: string) {
    return this.http.get<any>("assets/evaluations/" + evaluationName);
  }

  public getGrade() {
    return this.grade;
  }

  public setGrade(grade: number) {
    this.grade = grade;
  }
}
