import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private myAppUrl = 'http://localhost:3030/';
  private myUrlGet = 'user/getall/';
  private myUrlLogin = 'user/login/';
  private myApiInsert = 'user/insert/';
  private myUrlGoogle = 'api/ggogle';
  constructor(private http: HttpClient) { }

  getListUser(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myUrlGet);
  }
  insertLogin(user: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myUrlLogin,user);
  }
  insertUser(user: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiInsert,user);
  }
  insertLoginGoogle(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGoogle);
  }
}
