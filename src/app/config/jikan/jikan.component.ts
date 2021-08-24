import { Component, OnInit } from '@angular/core';
import { JikanService} from './jikan.service';
@Component({
  selector: 'app-jikan',
  templateUrl: './jikan.component.html',
  providers: [JikanService],
  styleUrls: ['./jikan.component.css']
})


export class JikanComponent implements OnInit {
  constructor() { 
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
