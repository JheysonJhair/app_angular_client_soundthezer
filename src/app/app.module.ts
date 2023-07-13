import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './components/aside/aside.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { HeadComponent } from './components/head/head.component';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { LoginComponent } from './components/login/login.component';
import { AsidetwoComponent } from './components/asidetwo/asidetwo.component';
import { RegisterComponent } from './components/register/register.component';
import { ConvertidorDialogComponent } from './components/convertidor-dialog/convertidor-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    VideoPlayerComponent,
    MusicPlayerComponent,
    HeadComponent,
    LoginComponent,
    AsidetwoComponent,
    RegisterComponent,
    ConvertidorDialogComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
