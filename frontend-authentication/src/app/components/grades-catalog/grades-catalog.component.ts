import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { EvaluationStudentService } from 'src/app/services/evaluation-student.service';

@Component({
  selector: 'grades-catalog',
  templateUrl: './grades-catalog.component.html',
  styleUrls: ['./grades-catalog.component.css']
})

export class GradesCatalogComponent implements OnInit {
  public students: any = [];
  public studentsFirst: any = [];
  public studentsSecond: any = [];
  public studentsFinal: any = [];
  public tableStudents!: MatTableDataSource<Student>
  public titles: string[] = ['nr', 'firstname', 'lastname', 'email', 'grade', 'evaluationType'];
  public firstEval: boolean = false;
  public secondEval: boolean = false;
  public finalEval: boolean = false;
  
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private _evaluationStudent: EvaluationStudentService, private _cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getStudents();
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
}