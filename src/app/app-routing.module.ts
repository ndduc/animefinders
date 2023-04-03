import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeComponent } from './module/anime/anime.component';
import { DmcaComponentComponent } from './module/dmca-component/dmca-component.component';
import { AnimeTopComponent } from './module/anime-top/anime-top.component';
import { AnimeSearchComponent } from './module/anime-search/anime-search.component';
import { VisualNovelComponent } from './module/visual-novel/visual-novel.component';
import { VisualNovelReleaseComponent } from './module/visual-novel-release/visual-novel-release.component';
import { VisualNovelProducerComponent } from './module/visual-novel-producer/visual-novel-producer.component';
import { VisualNovelCharacterComponent } from './module/visual-novel-character/visual-novel-character.component';
import { VisualNovelSearchComponent } from './module/visual-novel-search/visual-novel-search.component';

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
  {
    path: 'vn/release',
    component: VisualNovelReleaseComponent,
  },
  {
    path: 'vn/producer',
    component: VisualNovelProducerComponent,
  },
  {
    path: 'vn/character',
    component: VisualNovelCharacterComponent,
  },
  {
    path: 'vn/search',
    component: VisualNovelSearchComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
