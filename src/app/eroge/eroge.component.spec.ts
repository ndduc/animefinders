import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErogeComponent } from './eroge.component';

describe('ErogeComponent', () => {
  let component: ErogeComponent;
  let fixture: ComponentFixture<ErogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
