import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeComponent } from './module/anime/anime.component';
import { DmcaComponentComponent } from './module/dmca-component/dmca-component.component';
import { AnimeTopComponent } from './module/anime-top/anime-top.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'anime', 
    pathMatch: 'full'
  },
  {
    path: 'dmca',
    component: DmcaComponentComponent
  },
  {
    path: 'anime',
    component: AnimeComponent
  },
  {
    path: 'anime/season/:index/:season/:year',
    component: AnimeComponent,
    data: {
      
    }
  },
  {
    path: 'anime/top',
    component: AnimeTopComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
