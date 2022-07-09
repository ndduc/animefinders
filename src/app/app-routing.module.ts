import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HentaiComponent } from './hentai/hentai.component';
import { HomeComponent } from './home/home.component';
import { AnimeComponent } from './anime/anime.component';
import { ProjectComponent } from './project/project.component';
import { ConfigComponent } from './config/myaws/config.component';
import { JikanComponent } from './config/jikan/jikan.component';
import { DmcaComponentComponent } from './policy/dmca/dmca-component/dmca-component.component';
import { AnimeStreamComponent } from './anime-detail/anime-stream/anime-stream.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'anime', 
    pathMatch: 'full'
  },
  { 
    path: 'home',
    component: HomeComponent
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
    path: 'anime/:id/stream',
    component: AnimeStreamComponent
  },
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'http',
    component: ConfigComponent
  },
  {
    path: 'jikan',
    component: JikanComponent
  },
  {
    path: 'hentai',
    component: HentaiComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
