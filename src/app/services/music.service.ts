import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private myAppUrl = 'http://localhost:3030/';
  private myUrlGet = 'music/getall/';
  private myApiInsert = 'music/insert/';
  private myUrlDelete = 'music/delete/';
  private myUrlPut = 'music/update/';
  private myUrlGetId = 'music/getbyid/';

  constructor(private http: HttpClient) {}

  getListMusic(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myUrlGet);
  }
  deleteMusic(id: any): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myUrlDelete + id);
  }
  saveMusic(music: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiInsert, music);
  }
  getMusic(id: string): Observable<any> {
    return this.http.get(this.myAppUrl + this.myUrlGetId + id);
  }
  updateMusic(music: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myUrlPut, music);
  }

  descargarAudio(url: string) {
    const musicData = { url };

    this.http
      .post('http://localhost:3030/music/download', musicData, {
        responseType: 'blob' as 'json',
      })
      .subscribe(
        (response: any) => {
          console.log('¡Audio descargado y guardado en la carpeta assets!');
        },
        (error) => {
          console.error('Ocurrió un error al descargar el audio:', error);
        }
      );
  }

  playMusicById(id: number): Observable<Blob> {
    const url = `http://localhost:3030/music/downloadById/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
