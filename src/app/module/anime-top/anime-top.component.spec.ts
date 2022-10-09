import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeTopComponent } from './anime-top.component';

describe('AnimeTopComponent', () => {
  let component: AnimeTopComponent;
  let fixture: ComponentFixture<AnimeTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
