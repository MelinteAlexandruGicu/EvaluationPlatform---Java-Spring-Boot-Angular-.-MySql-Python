import { Component, OnInit, ViewChild } from '@angular/core';
import { EvaluationStudentService } from 'src/app/services/evaluation-student.service';
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
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  @ViewChild("chart") private chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  public studentsFirstEval: any;
  public studentsSecondEval: any;
  public studentsFinalEval: any;
  public gradesFirst: Array<number> = [];
  public gradesSecond: Array<number> = [];
  public gradesLast: Array<number> = [];
  public meanFirst: number = 0;
  public dvnStdFirst: number = 0;
  public meanSecond: number = 0;
  public dvnStdSecond: number = 0;
  public meanLast: number = 0;
  public dvnStdLast: number = 0;
  public probArrayFirst: Array<number> = [];
  public probArraySecond: Array<number> = [];
  public probArrayLast: Array<number> = [];

  constructor(private _evaluationStudent: EvaluationStudentService) {}

public getGrades(typeEvaluation: string) {
  let grades: Array<number> = [];
  let studentsArray: any;
  this._evaluationStudent.getStudentsByTypeOfEvaluation(typeEvaluation).subscribe(
    data => {
      studentsArray = data;
      studentsArray.forEach((element: any) => {grades.push(element.grade)});
      if(typeEvaluation == 'firstEvaluation'){
        this.meanFirst = parseFloat(this.calculateMean(grades));
        this.dvnStdFirst = parseFloat(this.calculateStandardDeviation(grades));
        this.probArrayFirst = this.toNormalDistribution(grades, this.meanFirst, this.dvnStdFirst)
        console.log("this.meanFirst " + this.meanFirst )
        console.log("this.dvnStdFirst " + this.dvnStdFirst )
        console.log("this.probArrayFirst " + this.probArrayFirst )
        
      }
      if(typeEvaluation == 'secondEvaluation'){
        this.meanSecond = parseFloat(this.calculateMean(grades));
        this.dvnStdSecond = parseFloat(this.calculateStandardDeviation(grades));
        this.probArraySecond = this.toNormalDistribution(grades, this.meanSecond, this.dvnStdSecond)
        console.log("this.meanSecond " + this.meanSecond )
        console.log("this.dvnStdSecond " + this.dvnStdSecond )
        console.log("this.probArraySecond " + this.probArraySecond )
        this.chartOptions = {
          series: [
            {
              name: "Grades",
              data: grades,
            }
          ],
          chart: {
            height: 350,
            type: "bar",
            style: {
              colors: ['#402218']
            }
          },
          title: {
            text: "Grades"
          },
          xaxis: {
            categories: [1, 2, 3, 4 ,5 ,6 ,7 , 8 , 9, 10]
          },
          grid: {
            row: {
              colors: ['#dcb99b']
            },
          },
        };
      }
      if(typeEvaluation == 'finalEvaluation'){
        this.meanLast = parseFloat(this.calculateMean(grades));
        this.dvnStdLast = parseFloat(this.calculateStandardDeviation(grades));
        this.probArrayLast = this.toNormalDistribution(grades, this.meanLast, this.dvnStdLast)
        console.log("this.meanLast " + this.meanLast )
        console.log("this.dvnStdLast " + this.dvnStdLast )
        console.log("this.probArrayLast " + this.probArrayLast )
      }
    },
    error => {
      console.log(error);
    });
}

  ngOnInit(): void {
    this.getGrades('firstEvaluation');
    this.getGrades('secondEvaluation');
    this.getGrades('finalEvaluation');
  }

  public calculateMean(gradesArray: Array<number>){
    return (gradesArray.reduce((a, b) => a + b) / gradesArray.length).toFixed(4);
  }

  public calculateStandardDeviation (gradesArray: Array<number>){
    const mean = parseFloat(this.calculateMean(gradesArray));;
    return Math.sqrt(gradesArray.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / gradesArray.length).toFixed(4)
  }

  public toNormalDistribution(gradesArray: Array<number>, mean: number, dvnStd: number) {
    let up, down;
    let probArray: Array<number> = [];
    for(let i = 0; i < gradesArray.length; i++) {
      up = Math.E ** -((gradesArray[i] - mean) ** 2 / (2 * dvnStd ** 2));
      down = dvnStd * Math.sqrt(2 * Math.PI);
      probArray[i] = up / down;
    }
    return probArray;
  }

}
