import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'course-upload',
  templateUrl: './course-upload.component.html',
  styleUrls: ['./course-upload.component.css']
})
export class CourseUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  coursesInfos?: Observable<any>;
  
  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.coursesInfos = this.uploadService.viewCoursesFromStorage();
  }

  public selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  public uploadFile(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadService.uploadCourse(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.coursesInfos = this.uploadService.viewCoursesFromStorage();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file for some reason!';
            }
            this.currentFile = undefined;
          }
        });
      }
      this.selectedFiles = undefined;
    }
  }

}
