import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnimeComponent } from './anime/anime.component';
import { DmcaComponentComponent } from './policy/dmca/dmca-component/dmca-component.component';
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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
