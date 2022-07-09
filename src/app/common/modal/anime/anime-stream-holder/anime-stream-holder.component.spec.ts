import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeStreamHolderComponent } from './anime-stream-holder.component';

describe('AnimeStreamHolderComponent', () => {
  let component: AnimeStreamHolderComponent;
  let fixture: ComponentFixture<AnimeStreamHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeStreamHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeStreamHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
