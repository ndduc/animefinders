import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumOptionComponent } from './enum-option.component';

describe('EnumOptionComponent', () => {
  let component: EnumOptionComponent;
  let fixture: ComponentFixture<EnumOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnumOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
