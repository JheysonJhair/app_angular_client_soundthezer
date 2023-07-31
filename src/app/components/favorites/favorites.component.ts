import { Component, HostListener } from '@angular/core';
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
    this.handleResize();
    this.idUser = this.aRoute.snapshot.paramMap.get('id')!;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.handleResize();
  }

  handleResize() {
    this.mostrarComponente = window.innerWidth > 1025;
  }

  toggleComponente() {
    this.mostrarComponente = !this.mostrarComponente;
  }
  redirectToLoginWithFavorites(name: string) {
    this.router.navigate(['/login', this.idUser, 'favorites', name]);
  }
}
