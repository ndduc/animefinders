import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeTorrentHolderCustomComponent } from './anime-torrent-holder-custom.component';

describe('AnimeTorrentHolderCustomComponent', () => {
  let component: AnimeTorrentHolderCustomComponent;
  let fixture: ComponentFixture<AnimeTorrentHolderCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeTorrentHolderCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeTorrentHolderCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
