import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationStudentService {
  private API_URL = 'http://localhost:6062/api/evaluation';
  private typeOfEvaluation: string = '';
  private content: string = '';
  private questions: any;
  constructor(private _http: HttpClient) { }

  public saveToCatalog(student: any, correct: number, wrong: number): Observable<any> {
    console.log("correct: " +  correct + " wrong: " + wrong);
    return this._http.post(this.API_URL + "/add-student/" + correct + "/" + wrong, student);
  }

  public getStudents(): Observable<any> {
    return this._http.get(`${this.API_URL}/get-students`);
  }

  public getStudentsByTypeOfEvaluation(typeOfEvaluation: string){
    return this._http.get(this.API_URL + "/student-eval-type/" + typeOfEvaluation);
  }

  public getFinalGrade(email: string){
    return this._http.get(this.API_URL + "/student-email/" + email);
  }

  public getGrade(email: string, typeOfEvaluation: string){
    return this._http.get(this.API_URL + "/student-email/" + email + "/" + typeOfEvaluation);
  }

  public setTypeOfEvaluation(evaluation: string) {
    this.typeOfEvaluation = evaluation;
  }

  public getTypeOfEvaluation() {
    return this.typeOfEvaluation;
  }

  public setContent(content: string) {
    this.content = content;
  }

  public getContent() {
    return this.content;
  }

  public setQuestions(questions: any) {
    this.questions = questions;
  }

  public getQuestions() {
    return this.questions;
  }
}
