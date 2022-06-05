import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HentaiComponent } from './hentai/hentai.component';
import { HomeComponent } from './home/home.component';
import { AnimeComponent } from './anime/anime.component';
import { ProjectComponent } from './project/project.component';
import { ConfigComponent } from './config/myaws/config.component';
import { JikanComponent } from './config/jikan/jikan.component';
import { DmcaComponentComponent } from './policy/dmca/dmca-component/dmca-component.component';
import { MainComponent } from './introduction/main/main.component';
import { AboutComponent } from './introduction/about/about.component';
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
    path: 'intro',
    component: MainComponent,
    data: {
      animation: 'HomePage'
    } 
  },
  { 
    path: 'about', 
    component: AboutComponent,
    data: {
      animation: 'AboutPage'
    } 
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
