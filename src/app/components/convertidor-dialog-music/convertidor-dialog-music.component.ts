import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-convertidor-dialog-music',
  templateUrl: './convertidor-dialog-music.component.html',
  styleUrls: ['./convertidor-dialog-music.component.css'],
})
export class ConvertidorDialogMusicComponent {
  addMusica: FormGroup;
  private downloadUrl = 'http://localhost:3030/api/musics/download';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ConvertidorDialogMusicComponent>
  ) {
    this.addMusica = this.fb.group({
      url: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/),
        ],
      ],
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
  //-------------------------------------------------------------------------DESCARGAR MUSICA
  descargarMusica(url: string): void {
    console.log('Descargando musica ...');
    const headers = new HttpHeaders({
      'Content-Type': 'audio/mpeg',
      Accept: 'audio/mpeg',
    });

    this.http
      .get(this.downloadUrl, {
        params: { url },
        headers,
        responseType: 'arraybuffer',
      })
      .subscribe(
        (response: ArrayBuffer) => {
          const blob = new Blob([response], { type: 'audio/mpeg' });

          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(blob);

          const filename = 'SoundTheserMusic.mp3';
          downloadLink.download = filename;
          downloadLink.click();
          URL.revokeObjectURL(downloadLink.href);
          this.toastr.success('Descarga completada!', 'Enhorabuena!');
        },
        (error) => {
          this.toastr.error('No se pudo descargar tu musica', 'Error!',error);
        }
      );
  }
}
