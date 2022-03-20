import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private API_URL = 'http://localhost:6061/api/fileManager';
  constructor(private http: HttpClient) { }
  
  public uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.API_URL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public viewFilesFromStorage(): Observable<any> {
    console.log(`${this.API_URL}/files`)
    return this.http.get(`${this.API_URL}/files`);
  }
}
