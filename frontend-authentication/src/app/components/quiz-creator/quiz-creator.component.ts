import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'quiz-creator',
  templateUrl: './quiz-creator.component.html',
  styleUrls: ['./quiz-creator.component.css']
})
export class QuizCreatorComponent implements OnInit {

  isLinear = false;
  firstQuestion!: FormGroup;
  secondQuestion!: FormGroup;
  thirdQuestion!: FormGroup;
  fourthQuestion!: FormGroup;
  fifthQuestion!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstQuestion = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondQuestion = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdQuestion = this._formBuilder.group({
      thirdCtrl:['', Validators.required],
    });
    this.fourthQuestion = this._formBuilder.group({
      fourthCtrl:['', Validators.required],
    });
    this.fifthQuestion = this._formBuilder.group({
      fifthCtrl:['', Validators.required],
    });

  }

}
