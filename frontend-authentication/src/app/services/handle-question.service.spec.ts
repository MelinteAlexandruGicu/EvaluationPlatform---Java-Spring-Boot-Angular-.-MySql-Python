import { TestBed } from '@angular/core/testing';

import { HandleQuestionService } from './handle-question.service';

describe('HandleQuestionService', () => {
  let service: HandleQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
