import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private myAppUrl = 'http://localhost:3030/';

  private myUrlGet = 'api/musics/getall/';
  private myApiInsert = 'api/musics/insert/';
  private myUrlDelete = 'api/musics/delete/';
  private myUrlPut = 'api/musics/update/';
  private myUrlGetId = 'api/musics/getbyid/';

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

  descargarMusica(url: string): Observable<void> {
    const body = { url };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'blob' as 'json',
    };

    return this.http
      .post<Blob>('http://localhost:3030/api/musics/download', body, httpOptions)
      .pipe(
        map((blob: Blob) => {
          this.guardarArchivo(blob);
        })
      );
  }

  private guardarArchivo(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'musica.mp3';
    link.click();
    window.URL.revokeObjectURL(url);
  }


  playMusicById(id: number): Observable<Blob> {
    const url = `http://localhost:3030/api/musics/downloadbyId/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
