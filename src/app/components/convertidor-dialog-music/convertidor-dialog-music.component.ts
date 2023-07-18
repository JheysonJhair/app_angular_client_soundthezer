import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VideoService } from 'src/app/services/video.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MusicService } from 'src/app/services/music.service';
@Component({
  selector: 'app-convertidor-dialog-music',
  templateUrl: './convertidor-dialog-music.component.html',
  styleUrls: ['./convertidor-dialog-music.component.css']
})
export class ConvertidorDialogMusicComponent {
  addMusica: FormGroup;
  private downloadUrl = 'http://localhost:3030/api/musics/download';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private _musicService: MusicService,
    public dialogRef: MatDialogRef<ConvertidorDialogMusicComponent>
  ) {
    this.addMusica = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)]],
    });
  }
  //--------------------------------------------------------------------ABRIR Y CERRAR DIALOG
  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    const videoData = {
      url: this.addMusica?.get('url')?.value,
    };
    this.descargarMusica(videoData.url);
    this.dialogRef.close();
  }
  //-------------------------------------------------------------------------DESCARGAR VIDEO
  descargarMusica(url: string): void {
    console.log("Descargando...");
    const headers = new HttpHeaders({
      'Content-Type': 'audio/mpeg',
      'Accept': 'audio/mpeg',
    });

    this.http.get(this.downloadUrl, { params: { url }, headers, responseType: 'arraybuffer' })
      .subscribe((response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'audio/mpeg' });

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);

        const filename = url.substring(url.lastIndexOf('/') + 1) + '.mp3';
        downloadLink.download = filename;
        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
      }, (error) => {
        console.error('Hubo un error al descargar la música:', error);
      });
  }
}
