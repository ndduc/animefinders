import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeStreamComponent } from './anime-stream.component';

describe('AnimeStreamComponent', () => {
  let component: AnimeStreamComponent;
  let fixture: ComponentFixture<AnimeStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
