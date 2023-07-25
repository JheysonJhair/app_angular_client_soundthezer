import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  mostrarComponente = true;

  toggleComponente() {
    this.mostrarComponente = !this.mostrarComponente;
  }
}
