import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcaComponentComponent } from './dmca-component.component';

describe('DmcaComponentComponent', () => {
  let component: DmcaComponentComponent;
  let fixture: ComponentFixture<DmcaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmcaComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
