import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeComponent } from './module/anime/anime.component';
import { DmcaComponentComponent } from './module/dmca-component/dmca-component.component';
import { AnimeTopComponent } from './module/anime-top/anime-top.component';
import { AnimeSearchComponent } from './module/anime-search/anime-search.component';
import { VisualNovelComponent } from './module/visual-novel/visual-novel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'anime/top/type/all', 
    pathMatch: 'full'
  },
  {
    path: 'dmca',
    component: DmcaComponentComponent
  },
  {
    path: 'anime/season/:index/:season/:year',
    component: AnimeComponent,
  },
  {
    path: 'anime/search/:title',
    component: AnimeSearchComponent,
  },
  {
    path: 'anime/top/:cat/:select',
    component: AnimeTopComponent
  },
  {
    path: 'vn/top/:filter',
    component: VisualNovelComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
