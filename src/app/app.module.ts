import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule} from '@angular/material/icon';
import { AnimeComponent } from './module/anime/anime.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AnimeModalComponent } from './dialog/anime/anime-modal/anime-modal.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AnimeTorrentHolderCustomComponent } from './dialog/anime/anime-torrent-holder-custom/anime-torrent-holder-custom.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DmcaComponentComponent } from './module/dmca-component/dmca-component.component';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { AnimeTorrentHolderComponent } from './dialog/anime/anime-torrent-holder/anime-torrent-holder.component';
import { QuestionModalComponent } from './dialog/question/question/question-modal/question-modal.component';
import { AnimeTopComponent } from './module/anime-top/anime-top.component';
import { AnimeNavigationBarComponent } from './navigator/anime-navigation-bar/anime-navigation-bar.component';
import { AnimeSearchComponent } from './module/anime-search/anime-search.component';
import { SideNavigationComponent } from './navigator/side-navigation/side-navigation.component';
import {MatListModule} from '@angular/material/list';
import { AnimeModelDetailComponent } from './dialog/anime/anime-model-detail/anime-model-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { VisualNovelComponent } from './module/visual-novel/visual-novel.component';
import { VisualNovelModalComponent } from './dialog/visual-novel/visual-novel-modal/visual-novel-modal.component';
import { VisualNovelTorrentHolderComponent } from './dialog/visual-novel/visual-novel-torrent-holder/visual-novel-torrent-holder.component';
import { VisualNovelTorrentHolderCustomComponent } from './dialog/visual-novel/visual-novel-torrent-holder-custom/visual-novel-torrent-holder-custom.component';
import { VisualNovelNavigationBarComponent } from './navigator/visual-novel-navigation-bar/visual-novel-navigation-bar.component';
import { VisualNovelReleaseComponent } from './module/visual-novel-release/visual-novel-release.component';
import { VisualNovelProducerComponent } from './module/visual-novel-producer/visual-novel-producer.component';
import { VisualNovelCharacterComponent } from './module/visual-novel-character/visual-novel-character.component';
import { VisualNovelSearchComponent } from './module/visual-novel-search/visual-novel-search.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimeComponent,
    AnimeModalComponent,
    AnimeTorrentHolderComponent,
    AnimeTorrentHolderCustomComponent,
    QuestionModalComponent,
    DmcaComponentComponent,
    AnimeTopComponent,
    AnimeNavigationBarComponent,
    AnimeSearchComponent,
    SideNavigationComponent,
    AnimeModelDetailComponent,
    VisualNovelComponent,
    VisualNovelModalComponent,
    VisualNovelTorrentHolderComponent,
    VisualNovelTorrentHolderCustomComponent,
    VisualNovelNavigationBarComponent,
    VisualNovelReleaseComponent,
    VisualNovelProducerComponent,
    VisualNovelCharacterComponent,
    VisualNovelSearchComponent,
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
    MglTimelineModule,
    MatListModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
