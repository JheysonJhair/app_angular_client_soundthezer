import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConvertidorDialogMusicComponent } from '../convertidor-dialog-music/convertidor-dialog-music.component';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asidetwo',
  templateUrl: './asidetwo.component.html',
  styleUrls: ['./asidetwo.component.css'],
})
export class AsidetwoComponent {
  isButtonDisabled = false;
  idUser: any;
  id: any;

  usuario: User;
  progresoDescarga = 0;
  constructor(
    private _loginService: LoginService,
    public dialog: MatDialog,
    private aRoute: ActivatedRoute
  ) {
    this.idUser = this.aRoute.snapshot.paramMap.get('id')!;
    this.id = this.aRoute.snapshot.paramMap.get('idVideo')!;
  }
  ngOnInit(): void {
    this.getUser();
  }
  //------------------------------------------------------------------------- USUARIO
  getUser() {
    this._loginService.getUser(this.idUser).subscribe((data) => {
      this.usuario = data.result;
    });
  }
  //------------------------------------------------------------------------- CONVERTIDOR MP4
  openDialog(): void {
    this.isButtonDisabled = true;
    const dialogRef = this.dialog.open(ConvertidorDialogMusicComponent, {
      width: '400px',
      panelClass: 'dialog-center',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.isButtonDisabled = false;
    });
  }
}
