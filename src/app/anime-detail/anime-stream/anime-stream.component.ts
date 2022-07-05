import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GogoanimeService } from 'src/app/config/gogoanime/gogoanime.service';

@Component({
  selector: 'app-anime-stream',
  templateUrl: './anime-stream.component.html',
  styleUrls: ['./anime-stream.component.css']
})
export class AnimeStreamComponent implements OnInit {
  constructor(
    private gogoanime: GogoanimeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      if (x.id) {
        this.gogoanime.search$.subscribe(x =>  {
          console.log(x);
        })
        this.gogoanime.getAnimeSearch(x.id);
      }
  
    })


  }

}
