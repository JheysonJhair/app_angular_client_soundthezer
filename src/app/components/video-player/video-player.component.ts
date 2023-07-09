import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { dtoVideo } from 'src/app/interfaces/Video';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  defaultVideoUrl: string = "https://www.youtube.com/watch?v=eOyNWshrOJQ&list=RDeOyNWshrOJQ&start_radio=1";
  safeVideoUrl: SafeResourceUrl; // URL segura del video

  //Listar videos
  listVideo: dtoVideo[] = [];

  //ADD - EDIT Videos
  addVideo: FormGroup;
  accion = 'Registrar';
  id = '';
  str2 = null;
  dtoVideo: dtoVideo | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private router: Router,
    private _videoService: VideoService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.addVideo = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', [Validators.required, ]]
    });
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.ver(this.defaultVideoUrl);
    this.getVideo();
    this.esEdit();
  }
  //---------------------------------------------------------------LISTAR VIDEO
  getVideo() {
    this._videoService.getListVideo().subscribe(
      response => {
        const result = response.result;
        this.listVideo = result;
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }

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
  //---------------------------------------------------------------AGREGAR - EDITAR VIDEO
  esEdit() {
    if (this.id !== null) {
      this.accion = 'Editar';
      this._videoService.getVideo(this.id).subscribe(
        (data) => {
          console.log(data);
          this.dtoVideo = data;

          this.addVideo.controls['name'].setValue(data[0].name);
          this.addVideo.controls['description'].setValue(data[0].description);
          this.addVideo.controls['url'].setValue(data[0].url);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  ver(url: string) {
    const videoId = this.extraerVideoId(url);
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  extraerVideoId(url: string): string {
    // Extraer el identificador del video de la URL abreviada
    const videoId = url.replace('https://youtu.be/', '');
    return videoId;
  }

  addEditVideo() {
    if (this.dtoVideo == undefined) {
      const videoData = {
        name: this.addVideo?.get('name')?.value,
        description: this.addVideo?.get('description')?.value,
        url: this.addVideo?.get('url')?.value
      };

      this._videoService.saveVideo(videoData).subscribe(
        (data) => {
          this.getVideo();
          this.toastr.success(
            'El video fue registrado con éxito',
            'Registro completo!'
          );
        },
        (error) => {
          this.toastr.error('Oops, ocurrió un error', 'Error');
          console.log(error);
        }
      );
    } else {
      const videoData = {
        idVideo: this.id,
        name: this.addVideo.get('name')?.value,
        description: this.addVideo.get('description')?.value,
        url: this.addVideo.get('url')?.value
      };

      this._videoService.updateVideo(videoData).subscribe(
        (data) => {
          this.getVideo();
          this.toastr.info(
            'El video fue actualizado con éxito',
            'Video actualizado!'
          );
          this.router.navigate([' ']);
        },
        (error) => {
          this.toastr.error('Oops, ocurrió un error', 'Error');
          console.log(error);
        }
      );
    }
  }

  //
  validateYouTubeUrl(control: AbstractControl): { [key: string]: any } | null {
    const urlPattern = /^https:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}$/;
    const validUrl = urlPattern.test(control.value);

    return validUrl ? null : { invalidUrl: true };
  }
}
