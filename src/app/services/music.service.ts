import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private myAppUrl = 'http://localhost:3030/';
  private myUrlGet = 'music/getall/';
  private myApiInsert = 'music/insert/';
  private myUrlDelete = 'music/delete/';
  private myUrlPut = 'music/update/';
  private myUrlGetId = 'music/getbyid/';

  constructor(private http: HttpClient) { }

  getListMusic(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myUrlGet);
  }
  deleteMusic(id: any): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myUrlDelete + id)
  }
  saveMusic(music:any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiInsert,music);
  }
  getMusic(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGetId + id);
  }
  updateMusic(music: any ): Observable<any>{
    return this.http.post(this.myAppUrl + this.myUrlPut, music);
  }
}
