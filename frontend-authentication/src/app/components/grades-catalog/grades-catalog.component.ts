import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { EvaluationStudentService } from 'src/app/services/evaluation-student.service';

@Component({
  selector: 'grades-catalog',
  templateUrl: './grades-catalog.component.html',
  styleUrls: ['./grades-catalog.component.css']
})

export class GradesCatalogComponent implements OnInit {
  @ViewChild('paginator') private paginator!: MatPaginator;
  public finalEval: boolean = false;
  public firstEval: boolean = false;
  public secondEval: boolean = false;
  public students: any = [];
  public studentsFinal: any = [];
  public studentsFirst: any = [];
  public studentsSecond: any = [];
  public tableStudents!: MatTableDataSource<Student>
  public titles: string[] = ['nr', 'firstname', 'lastname', 'email', 'grade', 'evaluationType'];
  constructor(private _evaluationStudent: EvaluationStudentService) {
  }

  public getAll() {
    this.firstEval = false;
    this.secondEval = false;
    this.finalEval = false;
  }

  public getStudenstByEval(typeOfEvaluation:string) {
    this._evaluationStudent.getStudentsByTypeOfEvaluation(typeOfEvaluation).subscribe(
      data => {
        if(typeOfEvaluation === "firstEvaluation") {
          this.secondEval = false;
          this.firstEval = true;
          this.finalEval = false;
          this.studentsFirst = data;
        }
    
        if(typeOfEvaluation === "secondEvaluation") {
          this.secondEval = true;
          this.firstEval = false;
          this.finalEval = false;
          this.studentsSecond = data;
        }
    
        if(typeOfEvaluation === "finalEvaluation") {
          console.log("aici")
          this.secondEval = false;
          this.firstEval = false;
          this.finalEval = true;
          this.studentsFinal = data;
        }
      },
      error => {
        console.log(error);
      });
  }

  public getStudents() {
    this._evaluationStudent.getStudents()
      .subscribe(
        data => {
          this.students = data;   
        },
        error => {
          console.log(error);
        });
  }

  ngOnInit(): void {
    this.getStudents();
  }
}