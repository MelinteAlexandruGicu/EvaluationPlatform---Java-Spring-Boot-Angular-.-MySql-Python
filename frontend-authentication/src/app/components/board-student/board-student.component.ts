import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-board-student',
  templateUrl: './board-student.component.html',
  styleUrls: ['./board-student.component.css']
})
export class BoardStudentComponent implements OnInit {
  public panelOpenState = true;
  appsInfos?: Observable<any>;
  coursesInfos?: Observable<any>;
  
  constructor(private uploadService: FileUploadService) { }
  
  ngOnInit(): void {
    this.appsInfos = this.uploadService.viewAppsFromStorage();
    this.coursesInfos = this.uploadService.viewCoursesFromStorage();
  }



}
