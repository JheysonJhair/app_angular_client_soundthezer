import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private myAppUrl = 'http://localhost:3030/';
  private myUrlGet = 'video/getall/';
  private myApiInsert = 'video/insert/';
  private myUrlDelete = 'video/delete/';
  private myUrlPut = 'video/update/';
  private myUrlGetId = 'video/getbyid?id=';

  constructor(private http: HttpClient) { }

  getListVideo(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myUrlGet);
  }
  deleteVideo(id: any): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myUrlDelete + id)
  }
  saveVideo(dtoVideo: FormData): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiInsert,dtoVideo);
  }
  getVideo(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGetId + id);
  }
  updateVideo(dtoVideo: FormData ): Observable<any>{
    return this.http.post(this.myAppUrl + this.myUrlPut, dtoVideo);
  }
}
