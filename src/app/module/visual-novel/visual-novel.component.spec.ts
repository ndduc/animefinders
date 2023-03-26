import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualNovelComponent } from './visual-novel.component';

describe('VisualNovelComponent', () => {
  let component: VisualNovelComponent;
  let fixture: ComponentFixture<VisualNovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualNovelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualNovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
