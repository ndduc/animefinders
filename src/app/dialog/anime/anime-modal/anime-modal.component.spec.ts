import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeModalComponent } from './anime-modal.component';

describe('AnimeModalComponent', () => {
  let component: AnimeModalComponent;
  let fixture: ComponentFixture<AnimeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
