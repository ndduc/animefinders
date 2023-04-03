import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualNovelCharacterComponent } from './visual-novel-character.component';

describe('VisualNovelCharacterComponent', () => {
  let component: VisualNovelCharacterComponent;
  let fixture: ComponentFixture<VisualNovelCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualNovelCharacterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualNovelCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
