import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionModalComponent } from './question-modal.component';

describe('QuestionModalComponent', () => {
  let component: QuestionModalComponent;
  let fixture: ComponentFixture<QuestionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
