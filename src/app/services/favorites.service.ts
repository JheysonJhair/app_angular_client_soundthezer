import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class favoritesService {
  //https://soundthezerb.ccontrolz.com/
  //http://localhost:3030/
  private myAppUrl = 'https://soundthezerb.ccontrolz.com/';
  private myUrlDelete = 'api/favorites/deletebyfavorite/video?idUser=';
  private myUrlDeleteVideo = '&idVideo=';
  private myUrlDeleteName = '&name=';

  private myApiInsert = 'api/favorites/insert/';

  private myApiGetFavUser = 'api/favorites/getbyfavorite/video?idUser=';
  private myApiGetFavUserName = '&name=';

  private myApiDeleteListFav = 'api/favorites/deleteplayist?name=';

  private myApiDeleteTotal = 'api/favorites/deletebyfavorite/total?idUser=';
  private myApiDeleteTotalVideo = '&idVideo=';

  private myApiGet = 'api/favorites/getverify?idVideo=';
  constructor(private http: HttpClient) { }

  insertFavorite(fav: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiInsert,fav);
  }
  getFavoritesUser(id:any, name:any){
    return this.http.get(this.myAppUrl + this.myApiGetFavUser + id + this.myApiGetFavUserName + name);
  }
  deleteFavorites(idUser: any, idVideo: any, name: string ): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myUrlDelete + idUser + this.myUrlDeleteVideo + idVideo + this.myUrlDeleteName + name);
  }
  deleteListFavorites(name: string ): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiDeleteListFav + name);
  }
  deleteFavoritesTotal(idUser:any, idVideo:any): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiDeleteTotal + idUser + this.myApiDeleteTotalVideo + idVideo);
  }
  getByIdVideoFavorite(id:any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiGet + id );
  }
}
