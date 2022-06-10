import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule} from '@angular/material/icon';
import { AnimeComponent } from './anime/anime.component';
import { ProjectComponent } from './project/project.component';
import { NavigatorComponent } from './common/navigator/navigator.component';
import { ConfigComponent } from './config/myaws/config.component';
import { JikanComponent } from './config/jikan/jikan.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AnimeModalComponent } from './common/modal/anime/anime-modal/anime-modal.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AnimeTorrentHolderComponent } from './common/modal/anime/anime-torrent-holder/anime-torrent-holder.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NavigatorCategoryComponent } from './common/navigator-category/navigator-category.component';
import { MangaComponent } from './manga/manga.component';
import { LightNovelComponent } from './light-novel/light-novel.component';
import { EnumOptionComponent } from './common/enum/enum-option/enum-option.component';
import { AnimeTorrentHolderCustomComponent } from './common/modal/anime/anime-torrent-holder-custom/anime-torrent-holder-custom.component';
import { QuestionModalComponent } from './common/modal/question/question-modal/question-modal.component';
import { HentaiComponent } from './hentai/hentai.component';
import { ErogeComponent } from './eroge/eroge.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DmcaComponentComponent } from './policy/dmca/dmca-component/dmca-component.component';
import { MainComponent } from './introduction/main/main.component';
import { AboutComponent } from './introduction/about/about.component';
import { ProjectIntroComponent } from './introduction/project-intro/project-intro.component';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { IntroNavigatorComponent } from './introduction/intro-navigator/intro-navigator.component';
import { ProjectModalComponent } from './introduction/modal-components/project-modal/project-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnimeComponent,
    ProjectComponent,
    NavigatorComponent,
    ConfigComponent,
    JikanComponent,
    AnimeModalComponent,
    AnimeTorrentHolderComponent,
    NavigatorCategoryComponent,
    MangaComponent,
    LightNovelComponent,
    EnumOptionComponent,
    AnimeTorrentHolderCustomComponent,
    QuestionModalComponent,
    HentaiComponent,
    ErogeComponent,
    DmcaComponentComponent,
    MainComponent,
    AboutComponent,
    ProjectIntroComponent,
    IntroNavigatorComponent,
    ProjectModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatGridListModule,
    NgbModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MglTimelineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
