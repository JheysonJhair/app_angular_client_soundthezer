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
        responseType: 'blob' as 'json', // Especificar que se espera una respuesta Blob
      })
      .subscribe(
        (response: any) => {
          // Ajustar el tipo del parámetro response a any
          this.guardarArchivo(response);
          console.log('¡Audio descargado y guardado en la carpeta assets!');
        },
        (error) => {
          console.error('Ocurrió un error al descargar el audio:', error);
        }
      );
  }

  guardarArchivo(blob: Blob) {
    const file = new File([blob], 'audio.mp3', { type: 'audio/mpeg' });
    const filePath = 'assets/audio.mp3';

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;

      // Guardar el archivo en la carpeta assets
      fetch(filePath, {
        method: 'PUT',
        body: base64data,
      })
        .then((response) => {
          if (response.ok) {
            console.log('¡Archivo guardado exitosamente en la carpeta assets!');
          } else {
            console.error(
              'Ocurrió un error al guardar el archivo:',
              response.status
            );
          }
        })
        .catch((error) => {
          console.error('Ocurrió un error al guardar el archivo:', error);
        });
    };

    reader.readAsDataURL(file);
  }

  playMusicById(id: number): Observable<Blob> {
    const url = `http://localhost:3030/music/downloadById/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
