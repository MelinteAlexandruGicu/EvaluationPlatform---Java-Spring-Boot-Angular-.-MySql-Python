import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'grades-catalog',
  templateUrl: './grades-catalog.component.html',
  styleUrls: ['./grades-catalog.component.css']
})

export class GradesCatalogComponent implements OnInit {
  columns = ['id', 'username', 'email', 'grade']
  data: MatTableDataSource<StudentData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const students: StudentData[] = [];
    for (let i = 0; i < 5; ++i) {
      students.push(createNewStudentTest(i));
    }

    this.data = new MatTableDataSource(students)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.data!.paginator = this.paginator;
    this.data!.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.data!.filter = filterValue;
  }
}

function createNewStudentTest(id: number): StudentData {
  const name =
    names[id]
  const email =
    emails[id]

  return {
    id: id + 1,
    username: name,
    email: email,
    grade: grades[id]
  };
}

const grades = [5, 6, 7, 10, 8];
const names = ['Alex', 'Stefania', 'Laur', 'Andrei', 'Matei']
const emails = ['alex@gmail.com', 'stefania@gmail.com', 'laur@gmail.com', 'andrei@gmail.com', 'matei@gmail.com']


export interface StudentData {
  id: number;
  username: string;
  email: string;
  grade: number;
}
