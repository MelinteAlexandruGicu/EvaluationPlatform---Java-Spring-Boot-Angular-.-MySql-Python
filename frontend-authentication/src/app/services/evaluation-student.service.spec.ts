import { TestBed } from '@angular/core/testing';

import { EvaluationStudentService } from './evaluation-student.service';

describe('EvaluationStudentService', () => {
  let service: EvaluationStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
