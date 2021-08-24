import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatorCategoryComponent } from './navigator-category.component';

describe('NavigatorCategoryComponent', () => {
  let component: NavigatorCategoryComponent;
  let fixture: ComponentFixture<NavigatorCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigatorCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatorCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
