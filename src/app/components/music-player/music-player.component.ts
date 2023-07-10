import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { dtoVideo } from 'src/app/interfaces/Video';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { dtoMusic } from 'src/app/interfaces/Music';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
})
export class MusicPlayerComponent implements OnInit {
  //Listar videos
  listMusic: dtoMusic[] = [
    {
      name: 'Video 1',
      description: 'Descripción del video 1',
      url: 'https://example.com/video1.mp4'
    },
    {
      name: 'Video 2',
      description: 'Descripción del video 2',
      url: 'https://example.com/video2.mp4'
    }

  ];

  //ADD - EDIT Videos
  addMusic: FormGroup;
  dtoMusic: dtoMusic | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _musicService: MusicService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.addMusic = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', [Validators.required, ]]
    });
  }

  ngOnInit(): void {
    this.getMusic();
  }
  //---------------------------------------------------------------LISTAR VIDEO
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
}
