import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualNovelTorrentHolderComponent } from './visual-novel-torrent-holder.component';

describe('VisualNovelTorrentHolderComponent', () => {
  let component: VisualNovelTorrentHolderComponent;
  let fixture: ComponentFixture<VisualNovelTorrentHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualNovelTorrentHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualNovelTorrentHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
