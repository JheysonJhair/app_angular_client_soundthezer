import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
})
export class HeadComponent {
  idUser: any;
  id: any;

  usuario: User;
  isMenuOpen = false;

  constructor(
    private _loginService: LoginService,
    private aRoute: ActivatedRoute
  ) {
    this.idUser = this.aRoute.snapshot.paramMap.get('id')!;
    this.id = this.aRoute.snapshot.paramMap.get('idVideo')!;
  }
  ngOnInit(): void {
    this.getUser();
  }
  //-------------------------------------------------------------------- TRAER USUARIO
  getUser() {
    this._loginService.getUser(this.idUser).subscribe((data) => {
      this.usuario = data.result;
    });
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
