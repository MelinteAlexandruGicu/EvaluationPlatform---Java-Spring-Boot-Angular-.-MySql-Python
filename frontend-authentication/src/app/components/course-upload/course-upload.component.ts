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
  public selectedFiles?: FileList;
  public currentFile?: File;
  public message: string = '';
  public coursesInfos?: Observable<any>;
  
  constructor(private _uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.coursesInfos = this._uploadService.viewCoursesFromStorage();
  }

  public selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  public uploadFile(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this._uploadService.uploadCourse(this.currentFile).subscribe({
          next: (event: any) => {
            if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.coursesInfos = this._uploadService.viewCoursesFromStorage();
            }
          },
          error: (err: any) => {
            console.log(err);
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file! The size of the file is too long!';
            }
            this.currentFile = undefined;
          }
        });
      }
      this.selectedFiles = undefined;
    }
  }
}
