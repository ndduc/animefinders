import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualNovelSearchComponent } from './visual-novel-search.component';

describe('VisualNovelSearchComponent', () => {
  let component: VisualNovelSearchComponent;
  let fixture: ComponentFixture<VisualNovelSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualNovelSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualNovelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
