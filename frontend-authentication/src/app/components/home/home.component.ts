import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public date  = '';
  public today = new Date();
  constructor() {
    this.date = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US');
  }
  ngOnInit(): void {
  }
}
