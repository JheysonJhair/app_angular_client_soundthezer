import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private myAppUrl = 'http://localhost:3030/';
  private myUrlGet = 'video/getall/';
  private myApiInsert = 'video/insert/';
  private myUrlDelete = 'video/delete/';
  private myUrlPut = 'video/update/';
  private myUrlGetId = 'video/getbyid/';

  constructor(private http: HttpClient) {}

  getListVideo(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myUrlGet);
  }
  deleteVideo(id: any): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myUrlDelete + id);
  }
  saveVideo(video: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiInsert, video);
  }
  getVideo(id: any): Observable<any> {
    return this.http.get(this.myAppUrl + this.myUrlGetId + id);
  }
  updateVideo(id: any, video: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myUrlPut + id, video);
  }

  descargarVideo(url: string): Observable<void> {
    const body = { url };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'blob' as 'json',
    };

    return this.http
      .post<Blob>('http://localhost:3030/video/downloadById/:id', body, httpOptions)
      .pipe(
        map((blob: Blob) => {
          this.guardarArchivo(blob);
        })
      );
  }

  guardarArchivo(blob: Blob): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'video.mp4';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
