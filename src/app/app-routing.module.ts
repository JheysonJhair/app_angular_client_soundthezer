import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  // Rutas para el usuario
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas para Video
  { path: 'login/:id/video', component: VideoPlayerComponent },
  { path: 'login/:id/update/:idvideo', component: VideoPlayerComponent },


  // Rutas para Musica
  { path: 'login/:id/music', component: MusicPlayerComponent },


  // Rutas para favoritos
  { path: 'login/:id/favorites', component: FavoritesComponent },
  { path: '**', redirectTo: '/', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
