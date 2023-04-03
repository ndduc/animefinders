import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualNovelReleaseComponent } from './visual-novel-release.component';

describe('VisualNovelReleaseComponent', () => {
  let component: VisualNovelReleaseComponent;
  let fixture: ComponentFixture<VisualNovelReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualNovelReleaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualNovelReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
