import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EvaluationStudentService } from 'src/app/services/evaluation-student.service';
import { QuizCreatorComponent } from '../quiz-creator/quiz-creator.component';

@Component({
  selector: 'app-board-teacher',
  templateUrl: './board-teacher.component.html',
  styleUrls: ['./board-teacher.component.css']
})
export class BoardTeacherComponent implements OnInit {
  public panelOpenState: boolean = true;
  public typeOfEvaluation: string = '';
  constructor(public dialog: MatDialog, private _evaluationStudent: EvaluationStudentService) { }

  ngOnInit(): void {
  }

  public openDialog(evaluation: string) {
    const dialogRef = this.dialog.open(QuizCreatorComponent, {
      width: '1450px',
      height: '1020px',
    });

    if(evaluation === "first") {
      this.typeOfEvaluation = "firstEvaluation";
    }

    if(evaluation === "second") {
      this.typeOfEvaluation = "secondEvaluation";
    }

    if(evaluation === "final") {
      this.typeOfEvaluation = "finalEvaluation";
    }

    this._evaluationStudent.setTypeOfEvaluation(this.typeOfEvaluation);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
