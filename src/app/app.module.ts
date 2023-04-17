import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule} from '@angular/material/icon';
import { AnimeComponent } from './module/anime/anime.component';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { FormsModule } from '@angular/forms';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyChipsModule as MatChipsModule} from '@angular/material/legacy-chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import { AnimeModalComponent } from './dialog/anime/anime-modal/anime-modal.component';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
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
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import { AnimeModelDetailComponent } from './dialog/anime/anime-model-detail/anime-model-detail.component';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
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
