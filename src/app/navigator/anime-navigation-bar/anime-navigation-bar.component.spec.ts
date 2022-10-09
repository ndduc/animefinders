import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeNavigationBarComponent } from './anime-navigation-bar.component';

describe('AnimeNavigationBarComponent', () => {
  let component: AnimeNavigationBarComponent;
  let fixture: ComponentFixture<AnimeNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeNavigationBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
