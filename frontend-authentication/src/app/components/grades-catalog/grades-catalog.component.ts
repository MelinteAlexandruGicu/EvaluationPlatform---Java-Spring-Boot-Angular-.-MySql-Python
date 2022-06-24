import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EvaluationStudentService } from 'src/app/services/evaluation-student.service';

@Component({
  selector: 'grades-catalog',
  templateUrl: './grades-catalog.component.html',
  styleUrls: ['./grades-catalog.component.css']
})

export class GradesCatalogComponent implements OnInit {
  // public firstname: string;
  // public lastname: string;
  // public grade: number;
  // public email: string;
  // public evaluationType: string;
  public students = [];

  constructor(private _evaluationStudent: EvaluationStudentService) {
    
    // this.firstname = studentsDb.firstname;
    // this.lastname = studentsDb.lastname;
    // this.grade = studentsDb.grade;
    // this.email = studentsDb.email;
    // this.evaluationType = studentsDb.evaluationType;
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this._evaluationStudent.getStudents()
      .subscribe(
        data => {
          console.log(data);
          this.students = data;
        },
        error => {
          console.log(error);
        });
  }
}