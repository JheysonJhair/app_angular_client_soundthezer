import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class favoritesService {
  private myAppUrl = 'http://localhost:3030/';
  private myUrlGet = 'api/favorites/getall/';
  private myUrlDelete = 'api/favorites/delete?idUser=';
  private myUrlDeleteVideo = '&id=';
  private myUrlGetFav = 'api/favorites/getbyid/';

  private myApiInsert = 'api/favorites/insert/';
  private myApiGetFavUser = 'api/favorites/getbyfavorite/video?idUser=';
  private myApiGetFavUserName = '&name=';

  constructor(private http: HttpClient) { }

  insertFavorite(fav: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiInsert,fav);
  }
  getFavoritesUser(id:any, name:any){
    return this.http.get(this.myAppUrl + this.myApiGetFavUser + id + this.myApiGetFavUserName + name);
  }
  deleteFavorites(idUser: any, idVideo: any): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myUrlDelete + idUser + this.myUrlDeleteVideo + idVideo);
  }

  getListFavorites(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myUrlGet);
  }
  getFavorites(id: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGetFav + id);
  }
}
