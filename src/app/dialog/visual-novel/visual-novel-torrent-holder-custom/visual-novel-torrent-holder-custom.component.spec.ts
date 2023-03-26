import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualNovelTorrentHolderCustomComponent } from './visual-novel-torrent-holder-custom.component';

describe('VisualNovelTorrentHolderCustomComponent', () => {
  let component: VisualNovelTorrentHolderCustomComponent;
  let fixture: ComponentFixture<VisualNovelTorrentHolderCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualNovelTorrentHolderCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualNovelTorrentHolderCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
