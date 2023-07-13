import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConvertidorDialogComponent } from '../convertidor-dialog/convertidor-dialog.component';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ConvertidorDialogComponent, {
      width: '400px',
      panelClass: 'dialog-center' // Agrega esta línea
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo cerrado');
    });
  }
}
