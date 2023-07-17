import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private fb: FormBuilder,
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
    const MusicData = {
      url: this.addMusica?.get('url')?.value,
    };
    this.descargarMusica(MusicData.url);
    this.dialogRef.close();
  }
  //-------------------------------------------------------------------------DESCARGAR MÚSICA
  descargarMusica(url: any) {
    console.log('Descargando');
    this._musicService.descargarMusica(url).subscribe(
      () => {
        this.toastr.success('Descarga completada!', 'Enhorabuena!');
      },
      (error) => {
        this.toastr.error('No se pudo descargar tu música', 'Error!');
      }
    );
  }
}

