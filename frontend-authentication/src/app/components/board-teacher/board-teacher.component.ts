import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { QuizCreatorComponent } from '../quiz-creator/quiz-creator.component';

@Component({
  selector: 'app-board-teacher',
  templateUrl: './board-teacher.component.html',
  styleUrls: ['./board-teacher.component.css']
})
export class BoardTeacherComponent implements OnInit {
  public panelOpenState: boolean = true;
  constructor(public dialog: MatDialog, private _uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  public openDialog() {
    const dialogRef = this.dialog.open(QuizCreatorComponent, {
      width: '1450px',
      height: '1020px',
      backdropClass: 'backdropBackground'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
