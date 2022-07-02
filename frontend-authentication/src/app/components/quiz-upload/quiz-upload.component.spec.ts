import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizUploadComponent } from './quiz-upload.component';

describe('QuizUploadComponent', () => {
  let component: QuizUploadComponent;
  let fixture: ComponentFixture<QuizUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
