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
    console.log("FUNCTIE DE SALVARE IN DB")
    const formData: FormData = new FormData();
    formData.append('file', JSON.stringify(file));
    const req = new HttpRequest('POST', `${this.API_URL}/quiz`, formData, {
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
    console.log(`${this.API_URL}/files-app`)
    return this.http.get(`${this.API_URL}/files-app`);
  }

  public viewCoursesFromStorage(): Observable<any> {
    console.log(`${this.API_URL}/files-course`)
    return this.http.get(`${this.API_URL}/files-course`);
  }
}
