import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualNovelModalComponent } from './visual-novel-modal.component';

describe('VisualNovelModalComponent', () => {
  let component: VisualNovelModalComponent;
  let fixture: ComponentFixture<VisualNovelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualNovelModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualNovelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
