import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JikanComponent } from './jikan.component';

describe('JikanComponent', () => {
  let component: JikanComponent;
  let fixture: ComponentFixture<JikanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JikanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JikanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
