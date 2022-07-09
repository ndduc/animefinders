import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GogoanimeService } from 'src/app/config/gogoanime/gogoanime.service';
// import * as jwplayer from 'jwplayer';


@Component({
  selector: 'app-anime-stream',
  templateUrl: './anime-stream.component.html',
  styleUrls: ['./anime-stream.component.css']
})
export class AnimeStreamComponent implements OnInit {
 // DEAD -- NO LONGER SUPPORT STREAMING
 // REASON -- Jwplayer not free

  constructor(
    private gogoanime: GogoanimeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      if (x.id) {
        this.gogoanime.detail$.subscribe(x =>  {
          x.episodesList.forEach(episode => {
            this.gogoanime.streamVIDCDN$.subscribe(vidcdn => {
            })
            this.gogoanime.getStreamVIDCDN(episode['episodeId']);
          })
        })
        this.gogoanime.getAnimeDetail(x.id);
      }
    })

    // const playerJw = jwplayer('player').setup({
    //   title: 'Player Test',
    //   playlist: 'https://cdn.jwplayer.com/v2/media/8L4m9FJB',
    //   width: 640,
    //   height: 360,
    //   aspectratio: '16:9',
    //   mute: false,
    //   autostart: false,
    //   primary: 'html5',
    // });
 
    // playerJw.onBeforePlay(function(e){
    //   alert('Starting');
    // });

  }

}
