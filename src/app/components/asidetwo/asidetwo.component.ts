import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConvertidorDialogMusicComponent } from '../convertidor-dialog-music/convertidor-dialog-music.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-asidetwo',
  templateUrl: './asidetwo.component.html',
  styleUrls: ['./asidetwo.component.css']
})
export class AsidetwoComponent {
  isButtonDisabled = false;
  name: string;

  constructor(public dialog: MatDialog, private _sharedService: SharedService) {
    this.name = this._sharedService.getName(); // Obtiene el nombre del servicio compartido
  }

  openDialog(): void {
    this.isButtonDisabled = true;
    const dialogRef = this.dialog.open(ConvertidorDialogMusicComponent, {
      width: '400px',
      panelClass: 'dialog-center'

    });
    dialogRef.afterClosed().subscribe(result => {
      this.isButtonDisabled = false;
      console.log('Diálogo cerrado');
    });
  }

}
