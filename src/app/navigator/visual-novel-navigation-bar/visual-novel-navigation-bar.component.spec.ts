import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualNovelNavigationBarComponent } from './visual-novel-navigation-bar.component';

describe('VisualNovelNavigationBarComponent', () => {
  let component: VisualNovelNavigationBarComponent;
  let fixture: ComponentFixture<VisualNovelNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualNovelNavigationBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualNovelNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
