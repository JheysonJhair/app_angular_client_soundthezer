import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { VideoService } from 'src/app/services/video.service';

import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { dtoVideo } from 'src/app/interfaces/Video';
import { favoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-list-favorites',
  templateUrl: './list-favorites.component.html',
  styleUrls: ['./list-favorites.component.css'],
})
export class ListFavoritesComponent implements OnInit {
  visible: boolean = true;

  safeVideoUrl: SafeResourceUrl;
  src: String;

  mostrarComponente = true;
  des: boolean = false;
  usuario2: User;

  isMenuOpen = false;
  defaultVideoUrl: string = 'https://youtu.be/DXV79KHSftc';
  title: string = 'Sound Thezer';
  subtitle: string = 'Escucha con Sound Thezer, para ayudar a reducir la velocidad y relajarse.';

  idUser: any;
  id: any;
  nameMusic: any;

  selectedVideoId: string;

  progresoDescarga = 0;
  edit: boolean = false;

  listVideo: dtoVideo[] = [];
  searchTerm = '';

  dtoVideo: dtoVideo | undefined;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private aRoute: ActivatedRoute,
    private _loginService: LoginService,
    private http: HttpClient,
    private _videoService: VideoService,
    private _favoriteService: favoritesService,
    private toastr: ToastrService
  ) {
    this.idUser = this.aRoute.snapshot.paramMap.get('id')!;
    this.nameMusic = this.aRoute.snapshot.paramMap.get('name')!;
    this.id = this.aRoute.snapshot.paramMap.get('idVideo')!;
  }

  ngOnInit(): void {
    this.verFavorites(this.defaultVideoUrl, 0);
    this.getFavorites();
    this.getUser();
  }
  //--------------------------------------------------------------------------- TRAER USUARIO
  getUser() {
    this._loginService.getUser(this.idUser).subscribe((data) => {
      this.usuario2 = data.result;
    });
  }
  //------------------------------------------------------------------------ LISTAR FAVORITO
  getFavorites() {
    this._favoriteService.getFavoritesUser(this.idUser, this.nameMusic).subscribe(
      (data:any) => {
        const result = data.data;
        this.listVideo = result;
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  //----------------------------------------------------------------------- ELIMINAR FAVORITO
  deleteFavorites(id: any) {
    this._favoriteService.deleteFavorites(this.idUser, id).subscribe(
      (data) => {
        this.getFavorites();
        this.toastr.error(
          'El video de favoritos fue eliminado con exito',
          'Registro eliminado!'
        );
        this.getFavorites();
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }

  actualizarPagina() {
    this.router.navigate(['login', this.idUser, 'video']);
  }
  //------------------------------------------------------------------------ REPRODUCIR FAVORITO

  verFavorites(url: string, id: any) {
    const videoId = this.extraerVideoId(url);
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
    this._videoService.getVideo(id).subscribe((data) => {
      this.title = data.result.name;
      this.subtitle = data.result.description;
    });
  }

  extraerVideoId(url: string): string {
    const videoId = url.replace('https://youtu.be/', '');
    return videoId;
  }

  //---------------------------------------------------------------------- DESCARGAR VIDEO USUARIO

  descargarVideoUsuario(id: any) {
    this.des = true;
    this.progresoDescarga = 10;
    setTimeout(() => {
      this.progresoDescarga = 50;
    }, 1000);
    setTimeout(() => {
      this.progresoDescarga = 70;
    }, 2000);
    this.http
      .get('http://localhost:3030/api/videos/downloadById/' + id, {
        responseType: 'blob',
      })
      .subscribe(
        (response) => {
          const url = window.URL.createObjectURL(response);
          console.log('Descargando...');
          this.toastr.success('Descarga completada!', 'Enhorabuena!');
          this.progresoDescarga = 90;
          const link = document.createElement('a');
          link.href = url;
          link.download = 'MiVideo.mp4';
          link.click();
          window.URL.revokeObjectURL(url);
          this.progresoDescarga = 100;
          this.des = false;
        },
        (error) => {
          this.toastr.error('No se pudo descargar tu video', 'Error!');
          console.log(error);
          this.progresoDescarga = 0;
        }
      );
  }
  //-----------------------------------------------------------------------------USUARIO
  toggleComponente() {
    this.mostrarComponente = !this.mostrarComponente;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
