import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {
  usuario: any;
  isMenuOpen = false;

  constructor(private _sharedService: SharedService) {
    this.usuario = this._sharedService.getUsuario();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
