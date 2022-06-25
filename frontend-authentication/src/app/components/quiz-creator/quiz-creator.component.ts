import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EvaluationStudentService } from 'src/app/services/evaluation-student.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'quiz-creator',
  templateUrl: './quiz-creator.component.html',
  styleUrls: ['./quiz-creator.component.css']
})
export class QuizCreatorComponent implements OnInit {
  public formGroup!: FormGroup;
  public answers!: FormArray;
  public questions!: FormArray;
  public saveSuccess:boolean = false;
  public maxWrongs:boolean = false;
  public currentQuestion: number = 1;
  public newWrongs: addWrongs[] = [];

  constructor(private _fb: FormBuilder, private _uploadService: FileUploadService, private _evaluationStudent: EvaluationStudentService) { }

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      questions : this._fb.array([this.init()])
    }) 
    this.addItem();
  }

  public init() {
   
    return this._fb.group({
      question: ['', Validators.required],
      correct: ['', Validators.required],
      wrong: ['', Validators.required],
      wrong1: ['', Validators.required],
      wrong2: ['', Validators.required],
    });
  }

  public getQuestions() {
    return (this.formGroup.get('questions') as FormArray).controls;
  }

  public addItem(){
    this.questions = this.formGroup.get('questions') as FormArray;
    this.questions.push(this.init());
  }

  public onSubmit() : void
  {
    let numberOfQuestions = this.questions.length;
    console.log("Nr:  " + numberOfQuestions);
    let answers = [];
    let question = []
    let i = 0;
    while(i < numberOfQuestions) {
      answers = [{"correct": this.formGroup.get('questions.' + i)?.value.correct}, 
      {"wrong": this.formGroup.get('questions.' + i)?.value.wrong},
      {"wrong1": this.formGroup.get('questions.' + i)?.value.wrong1},
      {"wrong2": this.formGroup.get('questions.' + i)?.value.wrong2}];
      question.push({"question": this.formGroup.get('questions.' + i)?.value.question, "answers": answers});
      i++;
    }

    let serializedForm = JSON.stringify({"questions": question});

    // console.log("Submitted " + serializedForm + " questions")
    var downloadURI = document.createElement('a');
    downloadURI.download = this._evaluationStudent.getTypeOfEvaluation() + ".json";
    downloadURI.href = 'data:text/plain;charset=utf-8,' + serializedForm;
    downloadURI.click();
    downloadURI.remove();
    this.saveSuccess = true;
}
  public backQuestion() {
    this.currentQuestion--;
  }

  public nextQuestion() {
    console.log(this.currentQuestion);
    if(this.currentQuestion < this.questions.length) {
      this.currentQuestion++;
    }
    else {
      this.onSubmit();
    }
    
  }

  public addNewWrongAnswer(): void {
    if(this.newWrongs.length < 3) {
      this.newWrongs.push(new addWrongs());
    }
    else {
      console.log("Maximul de raspunsuri gresite a fost admis");
      this.maxWrongs = true;
    }
  }
  
  public deleteWrongAnswer(): void{
    this.newWrongs.pop();
    this.maxWrongs = false;
    }
}

export class addWrongs {
}

