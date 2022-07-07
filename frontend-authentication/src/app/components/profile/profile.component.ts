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
import { EvaluationStudentService } from 'src/app/services/evaluation-student.service';
import { Chart } from 'angular-highcharts';
import Highcharts from 'highcharts';
import  Bellcurve from 'highcharts/modules/histogram-bellcurve';
Bellcurve(Highcharts);

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
  public studentsFirstEval: any;
  public studentsSecondEval: any;
  public studentsFinalEval: any;
  public gradesFirst: Array<number> = [];
  public gradesSecond: Array<number> = [];
  public gradesLast: Array<number> = [];
  data:Array<number>=[3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3, 3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3, 2.5, 3, 3.4, 3];
  chartAngular = new Chart({
    title: {
        text: 'Highcharts Histogram'
    },
    xAxis: [{
        title: { text: 'Data' },
        alignTicks: false
    }, {
        title: { text: 'Histogram' },
        alignTicks: false,
        opposite: true
    }],

    yAxis: [{
        title: { text: 'Data' }
    }, {
        title: { text: 'Histogram' },
        opposite: true
    }],

    series: [{
        name: 'Histogram',
        type: 'bellcurve',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: -1
    }, {
        name: 'Data',
        type: 'scatter',
        data: this.data,
        visible: false,
        id: 's1',
        marker: {
            radius: 1.5
        }
    }]
    });

  constructor(private _token: TokenStorageService, private _authService: AuthService, private _evaluationStudent: EvaluationStudentService) { 
    this.chartOptions = {
      series: [
        {
          name: "Grades",
          data: this.gradesSecond.sort((a, b) => a - b),
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
        categories: []
      },
      grid: {
        row: {
          colors: ['#dcb99b']
        },
      },
    };
  }

  public getFirstGrades() {
    this._evaluationStudent.getStudentsByTypeOfEvaluation('firstEvaluation').subscribe(
      data => {
        console.log(data);
        this.studentsFirstEval = data;
        this.studentsFirstEval.forEach( (element: any) => {this.gradesFirst.push(element?.grade)});
      },
      error => {
        console.log(error);
      });
  }

  public getSecondGrades() {
    this._evaluationStudent.getStudentsByTypeOfEvaluation('secondEvaluation').subscribe(
      data => {
        console.log(data);
        this.studentsSecondEval = data;
        this.studentsSecondEval.forEach( (element: any) => {this.gradesSecond.push(element?.grade); this.gradesSecond.sort((a, b) => a - b)});
      },
      error => {
        console.log(error);
      });
  }

  public getLastGrades() {
    this._evaluationStudent.getStudentsByTypeOfEvaluation('finalEvaluation').subscribe(
      data => {
        console.log(data);
        this.studentsFinalEval = data;
        this.studentsFinalEval.forEach( (element: any) => {this.gradesLast.push(element?.grade)});
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.currentUser = this._token.getUser();
    this.getFirstGrades();
    this.getSecondGrades();
    this.getLastGrades();
    console.log(this.gradesFirst)
    console.log(this.gradesSecond)
    console.log(this.gradesLast) 
  }

  public updateUser(id:number, username:string) {
    this._authService.updateUserUsername(id, username);
  }
}
