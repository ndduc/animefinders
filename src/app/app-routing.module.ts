import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AnimeComponent } from './anime/anime.component';
import { ProjectComponent } from './project/project.component';
import { ConfigComponent } from './config/myaws/config.component';
import { JikanComponent } from './config/jikan/jikan.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
