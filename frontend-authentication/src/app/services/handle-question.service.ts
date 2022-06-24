import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleQuestionService {

  public grade: number = 0;
  constructor(private http: HttpClient) { }

  getEvaluation(evaluationName: string) {
    return this.http.get<any>("assets/evaluations/" + evaluationName);
  }

  getGrade() {
    return this.grade;
  }

  setGrade(grade: number) {
    this.grade = grade;
  }
}
