import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './app-upload.component.html',
  styleUrls: ['./app-upload.component.css']
})
export class AppUploadComponent implements OnInit {
  public selectedFiles?: FileList;
  public currentFile?: File;
  public message: string = '';
  public fileInfos?: Observable<any>;
  
  constructor(private _uploadService: FileUploadService) { }
  
  ngOnInit(): void {
    this.fileInfos = this._uploadService.viewAppsFromStorage();
  }

  public selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  public uploadFile(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this._uploadService.uploadApp(this.currentFile).subscribe({
          next: (event: any) => {
             if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this._uploadService.viewAppsFromStorage();
            }
          },
          error: (err: any) => {
            console.log(err);
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
