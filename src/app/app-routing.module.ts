import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnimeComponent } from './anime/anime.component';
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
    path: 'http',
    component: ConfigComponent
  },
  {
    path: 'jikan',
    component: JikanComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
