import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConvertidorDialogComponent } from '../convertidor-dialog/convertidor-dialog.component';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  isButtonDisabled = false;
  constructor(public dialog: MatDialog) {}

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
}
