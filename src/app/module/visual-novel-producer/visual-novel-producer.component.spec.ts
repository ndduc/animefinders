import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualNovelProducerComponent } from './visual-novel-producer.component';

describe('VisualNovelProducerComponent', () => {
  let component: VisualNovelProducerComponent;
  let fixture: ComponentFixture<VisualNovelProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualNovelProducerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualNovelProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
