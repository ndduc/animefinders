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
import { AnimeModalComponent } from './dialog/anime/anime-modal/anime-modal.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AnimeTorrentHolderCustomComponent } from './dialog/anime/anime-torrent-holder-custom/anime-torrent-holder-custom.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DmcaComponentComponent } from './policy/dmca/dmca-component/dmca-component.component';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { NgImageSliderModule } from 'ng-image-slider';
import { AnimeTorrentHolderComponent } from './dialog/anime/anime-torrent-holder/anime-torrent-holder.component';
import { QuestionModalComponent } from './dialog/question/question/question-modal/question-modal.component';
import { NavigatorComponent } from './navigator/navigator.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnimeComponent,
    NavigatorComponent,
    JikanComponent,
    AnimeModalComponent,
    AnimeTorrentHolderComponent,
    AnimeTorrentHolderCustomComponent,
    QuestionModalComponent,
    DmcaComponentComponent,
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
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
