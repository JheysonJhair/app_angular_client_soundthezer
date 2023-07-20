import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConvertidorDialogComponent } from '../convertidor-dialog/convertidor-dialog.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  isButtonDisabled = false;
  usuario: any;

  constructor(public dialog: MatDialog, private _sharedService: SharedService) {
    this.usuario = this._sharedService.getUsuario();
  }

  openDialog(): void {
    this.isButtonDisabled = true;
    const dialogRef = this.dialog.open(ConvertidorDialogComponent, {
      width: '400px',
      panelClass: 'dialog-center'

    });
    dialogRef.afterClosed().subscribe(result => {
      this.isButtonDisabled = false;
      console.log('Diálogo cerrado');
    });
  }
  //------------------------------------------------BUSCAR
}
