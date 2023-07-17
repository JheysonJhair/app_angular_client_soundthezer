import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private myAppUrl = 'http://localhost:3030/';

  private myUrlGet = 'api/users/getall/';
  private myUrlLoginMail = 'api/users/login?email=';
  private myUrlLoginPass = '&password=';
  private myApiInsert = 'api/users/insert/';
  constructor(private http: HttpClient) { }

  getListUser(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myUrlGet);
  }
  getLogin(mail: any, pass: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlLoginMail + mail + this.myUrlLoginPass + pass);
  }
  insertUser(user: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiInsert,user);
  }
}
