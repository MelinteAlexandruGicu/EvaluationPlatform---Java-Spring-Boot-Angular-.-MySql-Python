import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private API_URL = 'http://localhost:6061/api/fileStorage';
  constructor(private http: HttpClient) { }
  
  public uploadApp(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.API_URL}/upload-app`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public saveQuiz(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.API_URL}/upload-quiz`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public uploadCourse(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.API_URL}/upload-course`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public viewAppsFromStorage(): Observable<any> {
    return this.http.get(`${this.API_URL}/files-app`);
  }

  public viewCoursesFromStorage(): Observable<any> {
    return this.http.get(`${this.API_URL}/files-course`);
  }

  public viewQuizzesFromStorage(): Observable<any> {
    return this.http.get(`${this.API_URL}/files-quizzes`);
  }
}
