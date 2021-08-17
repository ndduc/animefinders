import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeTorrentHolderComponent } from './anime-torrent-holder.component';

describe('AnimeTorrentHolderComponent', () => {
  let component: AnimeTorrentHolderComponent;
  let fixture: ComponentFixture<AnimeTorrentHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeTorrentHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeTorrentHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
