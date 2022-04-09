import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-teacher',
  templateUrl: './board-teacher.component.html',
  styleUrls: ['./board-teacher.component.css']
})
export class BoardTeacherComponent implements OnInit {
  public panelOpenState = true;
  constructor() { }

  ngOnInit(): void {
  }

}
