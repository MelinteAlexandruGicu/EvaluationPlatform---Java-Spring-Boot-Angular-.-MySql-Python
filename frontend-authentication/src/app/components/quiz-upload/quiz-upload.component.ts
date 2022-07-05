import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluationStudentService } from 'src/app/services/evaluation-student.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-quiz-upload',
  templateUrl: './quiz-upload.component.html',
  styleUrls: ['./quiz-upload.component.css']
})
export class QuizUploadComponent implements OnInit {
  public content: any;
  public currentFile?: File;
  public fileReader !: FileReader;
  public message: string = '';
  public quizzesInfos?: Observable<any>;
  public selectedFiles?: FileList;
  constructor(private _uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.quizzesInfos = this._uploadService.viewQuizzesFromStorage();
  }

  public removeQuiz(index: number): void {
    this._uploadService.deleteQuiz(index);
    window.location.reload();
  }

  public selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  public uploadFile(): void {
    if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
        if (file) {
          this.currentFile = file;
          this.fileReader = new FileReader();
          this.fileReader.onload = (e) => {
            this.content = this.fileReader.result as string;
            console.log(this.content)
            this._uploadService.saveQuiz(this.currentFile, this.fileReader.result as string).subscribe({
              next: (event: any) => {
                if (event instanceof HttpResponse) {
                  this.message = event.body.message;
                  this.quizzesInfos = this._uploadService.viewQuizzesFromStorage();
                  console.log(this.quizzesInfos);
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
          this.fileReader.readAsText(this.currentFile);
      }
      this.selectedFiles = undefined;
    }
  }
}