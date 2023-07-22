import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConvertidorDialogComponent } from '../convertidor-dialog/convertidor-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
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
  getUser() {
    this._loginService.getUser(this.idUser).subscribe((data) => {
      this.usuario = data.result;
    });
  }
  openDialog(): void {
    this.isButtonDisabled = true;
    const dialogRef = this.dialog.open(ConvertidorDialogComponent, {
      width: '400px',
      panelClass: 'dialog-center',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.isButtonDisabled = false;
    });
  }
}
