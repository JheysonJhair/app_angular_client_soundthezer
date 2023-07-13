import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { dtoMusic } from 'src/app/interfaces/Music';

import { MusicService } from 'src/app/services/music.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { saveAs } from 'file-saver';
import { VideoService } from 'src/app/services/video.service';
@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
})
export class MusicPlayerComponent implements OnInit {
  visible : boolean = true;
  src: String;
  listMusic: dtoMusic[] = [];

  selectedFile: File;

  addMusic: FormGroup;
  dtoMusic: dtoMusic | undefined;

  selectedVideoId: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private _videoService: VideoService,
    private _musicService: MusicService,
    private toastr: ToastrService
  ) {
    this.addMusic = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getMusic();
  }
  //-------------------------------------------------------------------------LISTAR MUSICA
  getMusic() {
    this._musicService.getListMusic().subscribe(
      (data) => {
        this.listMusic = data.result;
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  //-------------------------------------------------------------------------ELIMINAR MUSICA
  deleteMusic(videoId: any | undefined) {
    if (videoId) {
      this.selectedVideoId = videoId;
    }
    // Traer video
    this._videoService.getVideo(this.selectedVideoId).subscribe((data) => {
      this.listMusic = data.result;
      const videoJSON = {
        name: data.result.name,
        description: data.result.description,
        url: data.result.url,
        state: false,
      };
      this._videoService.updateVideo(videoId, videoJSON).subscribe();
    });
    this._musicService.deleteMusic(videoId).subscribe(
      (data) => {
        this.getMusic();
        this.toastr.error(
          'La música fue eliminado con exito',
          'Registro eliminado!'
        );
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  //-------------------------------------------------------------------------DESCARGAR MUSICA
  descargarAudioUsuario(id: any) {
    this.http
      .get('http://localhost:3030/music/downloadById/' + id, {
        responseType: 'blob',
      })
      .subscribe(
        (response) => {
          // Crear una URL para el blob de respuesta
          const url = window.URL.createObjectURL(response);
          console.log('Descargando...');
          this.toastr.success('Descarga completada!', 'Enhorabuena!');
          const link = document.createElement('a');
          link.href = url;
          link.download = 'audio.mp3';
          link.click();

          window.URL.revokeObjectURL(url);
        },
        (error) => {
          this.toastr.error('No se pudo descargar tu video', 'Error!');
        }
      );
  }
  //-------------------------------------------------------------------------REPRODUCIR MUSICA
  playMusic(id: any): void {

    console.log("entrando")
    this._musicService.playMusicById(id).subscribe(
      (blob: Blob) => {
        this.visible = false;
        this.src = URL.createObjectURL(blob);
        console.log("LISTO");
      },
      (error) => {
        console.error('Error al descargar la música:', error);
      }
    );
  }


//-------------------------------------------------------------------------REPRODUCIR MUSICA LOCAL

onFileSelected(event: any): void {
  const file = event.target.files[0];
  this.visible = true;
  this.src = URL.createObjectURL(file);
  this.visible = false;
}

playAudio(): void {
  const audioElement = document.getElementById('custom-audio') as HTMLAudioElement;
  audioElement.play();
}

pauseAudio(): void {
  const audioElement = document.getElementById('custom-audio') as HTMLAudioElement;
  audioElement.pause();
}

stopAudio(): void {
  const audioElement = document.getElementById('custom-audio') as HTMLAudioElement;
  audioElement.pause();
  audioElement.currentTime = 0;
}
}
