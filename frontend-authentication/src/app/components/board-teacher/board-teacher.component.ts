import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseUploadComponent } from '../course-upload/course-upload.component';
import { QuizCreatorComponent } from '../quiz-creator/quiz-creator.component';

@Component({
  selector: 'app-board-teacher',
  templateUrl: './board-teacher.component.html',
  styleUrls: ['./board-teacher.component.css']
})
export class BoardTeacherComponent implements OnInit {
  public panelOpenState = true;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(QuizCreatorComponent, {
      width: '1450px',
      height: '1020px',
      backdropClass: 'backdropBackground'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogForUpload() {
    const dialogRef = this.dialog.open(CourseUploadComponent, {
      width: '1450px',
      height: '1020px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
