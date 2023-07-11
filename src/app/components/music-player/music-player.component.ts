import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { dtoMusic } from 'src/app/interfaces/Music';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
})
export class MusicPlayerComponent implements OnInit {
  src: String;
  listMusic: dtoMusic[] = [
    {
      name: 'Video 1',
      description: 'Descripción del video 1',
      url: '../../assets/audio.webm',
    },
    {
      name: 'Video 2',
      description: 'Descripción del video 2',
      url: '../../assets/music/Moderatto.mp3',
    },
  ];

  addMusic: FormGroup;
  dtoMusic: dtoMusic | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
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
        this.listMusic = data.listDtoVideo;
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  //-------------------------------------------------------------------------ELIMINAR MUSICA
  deleteMusic(id: any) {
    this._musicService.deleteMusic(id).subscribe(
      (data) => {
        this.getMusic();
        this.toastr.error(
          'La música fue eliminado con exito',
          'Registro eliminado!'
        );
        this.router.navigate([' ']);
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  //-------------------------------------------------------------------------DESCARGAR MUSICA
  descargar(url: any) {
    this._musicService.descargarAudio(url).subscribe(
      () => {
        console.log('Descarga completada');
      },
      (error) => {
        console.error('Ocurrió un error al descargar el audio:', error);
      }
    );
  }
  //-------------------------------------------------------------------------REPRODUCIR VIDEO
  escuchar() {}
}
