import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  @ViewChild("chart") private chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  public currentUser: any;

  constructor(private _token: TokenStorageService, private _authService: AuthService) { 
    this.chartOptions = {
      series: [
        {
          name: "Number of students",
          data: [2, 2, 3, 5, 6, 4, 2],
        },
        {
          name: "Grades",
          data: [5, 6, 7, 8, 6, 4, 2],
        }
      ],
      chart: {
        height: 350,
        type: "area",
        style: {
          colors: ['#402218']
        }
      },
      title: {
        text: "Grades"
      },
      xaxis: {
        categories: ["<5", "5",  "6",  "7",  "8",  "9",  "10"]
      },
      grid: {
        row: {
          colors: ['#dcb99b']
        },
      },
    };
  }

  ngOnInit(): void {
    this.currentUser = this._token.getUser();
    console.log(this.currentUser)
  }

  public updateUser(id:number, username:string) {
    this._authService.updateUserUsername(id, username);
  }

;
}
