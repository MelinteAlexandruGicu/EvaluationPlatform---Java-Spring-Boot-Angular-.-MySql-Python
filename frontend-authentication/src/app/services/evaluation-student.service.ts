import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class EvaluationStudentService {
  private API_URL = 'http://localhost:6062/api/evaluation';
  private typeOfEvaluation: string = '';
  constructor(private _http: HttpClient) { }

  public saveToCatalog(student: any): Observable<any> {
    return this._http.post(`${this.API_URL}/add-student`, student);
  }

  public getStudents(): Observable<any> {
    return this._http.get(`${this.API_URL}/get-students`);
  }

  public setTypeOfEvaluation(evaluation: string) {
    this.typeOfEvaluation = evaluation;
  }

  public getTypeOfEvaluation() {
    return this.typeOfEvaluation;
  }
}
