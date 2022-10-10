import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeModelDetailComponent } from './anime-model-detail.component';

describe('AnimeModelDetailComponent', () => {
  let component: AnimeModelDetailComponent;
  let fixture: ComponentFixture<AnimeModelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeModelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeModelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
