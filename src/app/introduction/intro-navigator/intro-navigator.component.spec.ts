import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroNavigatorComponent } from './intro-navigator.component';

describe('IntroNavigatorComponent', () => {
  let component: IntroNavigatorComponent;
  let fixture: ComponentFixture<IntroNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroNavigatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
