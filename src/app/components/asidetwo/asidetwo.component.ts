import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConvertidorDialogMusicComponent } from '../convertidor-dialog-music/convertidor-dialog-music.component';
@Component({
  selector: 'app-asidetwo',
  templateUrl: './asidetwo.component.html',
  styleUrls: ['./asidetwo.component.css']
})
export class AsidetwoComponent {
  isButtonDisabled = false;
  constructor(public dialog: MatDialog) {}

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
