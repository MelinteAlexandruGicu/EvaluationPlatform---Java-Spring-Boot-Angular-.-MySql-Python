import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private API_URL = 'http://localhost:6061/api/fileStorage';
  constructor(private _http: HttpClient) { }
  
  public uploadApp(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.API_URL}/upload-app`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this._http.request(req);
  }

  public saveQuiz(file: any, content:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('content', content);
    const req = new HttpRequest('POST', `${this.API_URL}/upload-quiz`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this._http.request(req);
  }

  public uploadCourse(file: File,): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.API_URL}/upload-course`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this._http.request(req);
  }

  public viewAppsFromStorage(): Observable<any> {
    return this._http.get(`${this.API_URL}/files-app`);
  }

  public viewCoursesFromStorage(): Observable<any> {
    return this._http.get(`${this.API_URL}/files-course`);
  }

  public viewQuizzesFromStorage(): Observable<any> {
    return this._http.get(`${this.API_URL}/files-quizzes`);
  }

  public deleteQuiz(id: number) {
    console.log("delete spre back cu id " + id);
    return this._http.delete(this.API_URL + "/files-quizzes/" + id).subscribe(data => {
      console.log(data);
    });
  }
}
