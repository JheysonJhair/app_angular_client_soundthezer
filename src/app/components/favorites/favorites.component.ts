import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  mostrarComponente = true;
  idUser: any;

  constructor(private router: Router, private aRoute: ActivatedRoute) {
    this.idUser = this.aRoute.snapshot.paramMap.get('id')!;
  }
  toggleComponente() {
    this.mostrarComponente = !this.mostrarComponente;
  }
  redirectToLoginWithFavorites(name: string) {
    this.router.navigate(['/login', this.idUser, 'favorites', name]);
  }
}
