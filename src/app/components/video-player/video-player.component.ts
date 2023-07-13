import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { dtoVideo } from 'src/app/interfaces/Video';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { MusicService } from 'src/app/services/music.service';
import { dtoMusic } from 'src/app/interfaces/Music';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  defaultVideoUrl: string =
    'https://www.youtube.com/watch?v=eOyNWshrOJQ&list=RDeOyNWshrOJQ&start_radio=1';
  safeVideoUrl: SafeResourceUrl; // URL segura del video

  edit: boolean = false;
  selectedVideoId: string;

  listVideo: dtoVideo[] = [];
  listMusic: dtoMusic[] = [];

  addVideo: FormGroup;
  accion = 'Registrar';
  id: string;
  str2 = null;
  dtoVideo: dtoVideo | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _videoService: VideoService,
    private _musicService: MusicService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.addVideo = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', [Validators.required]],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
    console.log('ID: ' + this.id);
  }

  ngOnInit(): void {
    this.verVideo(this.defaultVideoUrl);
    this.getVideo();
    this.esEdit();
  }
  //---------------------------------------------------------------LISTAR VIDEO
  getVideo() {
    this._videoService.getListVideo().subscribe(
      (response) => {
        const result = response.result;
        this.listVideo = result;
        console.log();
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  //---------------------------------------------------------------ELIMINAR VIDEO
  deleteVideo(id: any) {
    this._videoService.deleteVideo(id).subscribe(
      (data) => {
        this.getVideo();
        this.toastr.error(
          'El video fue eliminado con exito',
          'Registro eliminado!'
        );
        this.getVideo();
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  //--------------------------------------------------------------- ES EDIT? REGISTRAR - EDITAR
  esEdit() {
    if (this.id !== null) {
      this.accion = 'Editar';
      this.edit = true;
      this._videoService.getVideo(this.id).subscribe(
        (data) => {
          console.log(data);
          this.dtoVideo = data.result;

          this.addVideo.controls['name'].setValue(this.dtoVideo?.name);
          this.addVideo.controls['description'].setValue(
            this.dtoVideo?.description
          );
          this.addVideo.controls['url'].setValue(this.dtoVideo?.url);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  //---------------------------------------------------------------AGREGAR - EDITAR VIDEO
  addEditVideo() {
    if (this.dtoVideo == undefined) {
      const videoData = {
        name: this.addVideo?.get('name')?.value,
        description: this.addVideo?.get('description')?.value,
        url: this.addVideo?.get('url')?.value,
      };

      this._videoService.saveVideo(videoData).subscribe(
        (data) => {
          this.getVideo();
          this.toastr.success(
            'El video fue registrado con éxito',
            'Registro completo!'
          );
          this.addVideo.reset();
        },
        (error) => {
          this.toastr.error('Oops, ocurrió un error', 'Error');
          console.log(error);
        }
      );
    } else {
      const videoData = {
        id: this.id,
        name: this.addVideo.get('name')?.value,
        description: this.addVideo.get('description')?.value,
        url: this.addVideo.get('url')?.value,
      };
      console.log(videoData);
      this._videoService.updateVideo(this.id, videoData).subscribe(
        (data) => {
          this.toastr.info(
            'El video fue actualizado con éxito',
            'Video actualizado!'
          );
          this.router.navigate(['/video']);
        },
        (error) => {
          this.toastr.error('Oops, ocurrió un error', 'Error');
          console.log(error);
        }
      );
    }
  }
  //------------------------------------------------------------------------REPRODUCIR VIDEO

  verVideo(url: string) {
    const videoId = this.extraerVideoId(url);
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

  extraerVideoId(url: string): string {
    const videoId = url.replace('https://youtu.be/', '');
    return videoId;
  }
  //------------------------------------------------------------------VALIDACIONES URL VIDEO
  validateYouTubeUrl(control: AbstractControl): { [key: string]: any } | null {
    const urlPattern = /^https:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}$/;
    const validUrl = urlPattern.test(control.value);

    return validUrl ? null : { invalidUrl: true };
  }
  //-----------------------------------------------------------------DESCARGAR VIDEO USUARIO
  descargarVideoUsuario(id: any) {
    // Realizar la solicitud GET al endpoint
    this.http
      .get('http://localhost:3030/video/downloadById/' + id, {
        responseType: 'blob',
      })
      .subscribe(
        (response) => {
          // Crear una URL para el blob de respuesta
          const url = window.URL.createObjectURL(response);
          console.log('Descargando...');
          // Crear un enlace temporal para descargar el archivo
          this.toastr.success('Descarga completada!', 'Enhorabuena!');
          const link = document.createElement('a');
          link.href = url;
          link.download = 'video.mp4';
          link.click();

          // Liberar los recursos
          window.URL.revokeObjectURL(url);
        },
        (error) => {
          // Manejar el error
          this.toastr.error('No se pudo descargar tu video', 'Error!');
        }
      );
  }
  //-----------------------------------------------------------------------AGREGAR PLAY LIST
  addPlayMusic(videoId: any | undefined) {
    if (videoId) {
      this.selectedVideoId = videoId;
    }
    // Traer video
    this._videoService.getVideo(this.selectedVideoId).subscribe((data) => {
      this.listMusic = data.result;
      const videoJSON = {
        id: data.result.id,
        name: data.result.name,
        description: data.result.description,
        url: data.result.url,
        state: true,
      };
      // Enviar el resultado al servicio de música
      this._videoService.updateVideo(videoId, videoJSON).subscribe();

      this._musicService.saveMusic(this.listMusic).subscribe(
        (data) => {
          this.toastr.success('Agregando a tu Playlist', 'Enhorabuena!');
          setTimeout(function () {
            location.reload();
          }, 2000);
        },
        (error) => {
          this.toastr.error('Oops, ocurrió un error', 'Error');
          console.log(error);
        }
      );
    });
  }
}
