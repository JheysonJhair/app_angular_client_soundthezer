import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';

const routes: Routes = [
  { path: '' , component: VideoPlayerComponent},
  { path: 'update/:id', component: VideoPlayerComponent},
  { path: 'music' , component: MusicPlayerComponent},
  { path: '**', redirectTo: '/', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
