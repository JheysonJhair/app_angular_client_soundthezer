import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private myAppUrl = 'https://soundthezerb.ccontrolz.com/';
  private myUrlGet = 'api/users/getall/';
  private myUrlGetUser = 'api/users/getbyid/';
  private myApiInsert = 'api/users/insert/';
  private myUrlGoogle = 'api/users/google';
  private myUrlLoginMail = 'api/users/login?email=';
  private myUrlLoginPass = '&password=';
  constructor(private http: HttpClient) { }

  getListUser(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myUrlGet);
  }
  getUser(id: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGetUser + id);
  }
  getLogin(mail: any, pass: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlLoginMail + mail + this.myUrlLoginPass + pass);
  }
  insertUser(user: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiInsert,user);
  }
  insertLoginGoogle(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGoogle);
  }
}
