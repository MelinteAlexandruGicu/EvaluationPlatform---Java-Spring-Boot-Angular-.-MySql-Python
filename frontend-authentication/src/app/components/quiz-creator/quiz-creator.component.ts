import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'quiz-creator',
  templateUrl: './quiz-creator.component.html',
  styleUrls: ['./quiz-creator.component.css']
})
export class QuizCreatorComponent implements OnInit {

  firstQuestion!: FormGroup 
  secondQuestion!: FormGroup;
  thirdQuestion!: FormGroup;
  fourthQuestion!: FormGroup;
  fifthQuestion!: FormGroup;
  saveSuccess:boolean = false;

  constructor(private fb: FormBuilder, private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.firstQuestion = this.fb.group({
      question: ['', Validators.required],
      correct: ['', Validators.required],
      wrong: ['', Validators.required],
      bad: ['', Validators.required],
      worst: ['', Validators.required]
    });
    this.secondQuestion = this.fb.group({
      question: ['', Validators.required],
      correct: ['', Validators.required],
      wrong: ['', Validators.required],
      bad: ['', Validators.required],
      worst: ['', Validators.required]
    });
    this.thirdQuestion = this.fb.group({
      question: ['', Validators.required],
      correct: ['', Validators.required],
      wrong: ['', Validators.required],
      bad: ['', Validators.required],
      worst: ['', Validators.required]
    });
    this.fourthQuestion = this.fb.group({
      question: ['', Validators.required],
      correct: ['', Validators.required],
      wrong: ['', Validators.required],
      bad: ['', Validators.required],
      worst: ['', Validators.required]
    });
    this.fifthQuestion = this.fb.group({
      question: ['', Validators.required],
      correct: ['', Validators.required],
      wrong: ['', Validators.required],
      bad: ['', Validators.required],
      worst: ['', Validators.required]
    });

  }

  onSubmit() : void
  {
    let a1 = [{"correct": this.firstQuestion.controls['correct'].value}, 
              {"wrong": this.firstQuestion.controls['wrong'].value},
              {"bad": this.firstQuestion.controls['bad'].value},
              {"worst": this.firstQuestion.controls['worst'].value}]  
    let first = {"question": this.firstQuestion.controls['question'].value, "answers": a1}
    
    let a2 = [{"correct": this.secondQuestion.controls['correct'].value}, 
    {"wrong": this.secondQuestion.controls['wrong'].value},
    {"bad": this.secondQuestion.controls['bad'].value},
    {"worst": this.secondQuestion.controls['worst'].value}]
    let second = {"question": this.secondQuestion.controls['question'].value, "answers": a2}

    let a3 = [{"correct": this.thirdQuestion.controls['correct'].value}, 
    {"wrong": this.thirdQuestion.controls['wrong'].value},
    {"bad": this.thirdQuestion.controls['bad'].value},
    {"worst": this.thirdQuestion.controls['worst'].value}]
    let third = {"question": this.thirdQuestion.controls['question'].value, "answers": a3}

    let a4 = [{"correct": this.fourthQuestion.controls['correct'].value}, 
    {"wrong": this.fourthQuestion.controls['wrong'].value},
    {"bad": this.fourthQuestion.controls['bad'].value},
    {"worst": this.fourthQuestion.controls['worst'].value}]
    let fourth = {"question": this.fourthQuestion.controls['question'].value, "answers": a4}

    let a5 = [{"correct": this.fifthQuestion.controls['correct'].value}, 
    {"wrong": this.fifthQuestion.controls['wrong'].value},
    {"bad": this.fifthQuestion.controls['bad'].value},
    {"worst": this.fifthQuestion.controls['worst'].value}]
    let fifth = {"question": this.fifthQuestion.controls['question'].value, "answers": a5}

    let serializedForm = JSON.stringify({"questions": [first, second, third, fourth, fifth]});

    console.log(serializedForm);
    
    var downloadURI = document.createElement('a');
    downloadURI.download = 'firstEvaluation.json'; // the file name
    downloadURI.href = 'data:text/plain;charset=utf-8,' + serializedForm;
    downloadURI.click();
    downloadURI.remove();
    
    this.saveSuccess = true;
  }
}
