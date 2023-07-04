import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { dtoVideo } from 'src/app/interfaces/Video';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent {
  listVideo: dtoVideo[] = [];
  constructor(
    private _videoService: VideoService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getVideo();
  }
  getVideo() {
    this._videoService.getListVideo().subscribe(
      (data) => {
        this.listVideo = data.listDtoVideo;
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
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
}
