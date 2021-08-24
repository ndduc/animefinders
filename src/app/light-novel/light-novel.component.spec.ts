import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightNovelComponent } from './light-novel.component';

describe('LightNovelComponent', () => {
  let component: LightNovelComponent;
  let fixture: ComponentFixture<LightNovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightNovelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightNovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
