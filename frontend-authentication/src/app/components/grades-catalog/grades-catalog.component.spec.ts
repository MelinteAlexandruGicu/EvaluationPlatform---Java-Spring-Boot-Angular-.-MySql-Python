import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesCatalogComponent } from './grades-catalog.component';

describe('GradesCatalogComponent', () => {
  let component: GradesCatalogComponent;
  let fixture: ComponentFixture<GradesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
