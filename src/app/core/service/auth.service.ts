import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { HOST_AUTH} from '../constants/api';
import { AuthLoginInfo } from '../../data/schema/auth/login';
import { User } from '../../data/schema/auth/user'
import { Response } from '../../data/schema/response';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = HOST_AUTH + 'login';
  private logoutURL = HOST_AUTH + 'logout';

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  attemptAuth(credentials: AuthLoginInfo): Observable<Response> {
    const user: User = {
      sysUserId: credentials.username,
      password: credentials.password
    };
    return this.http.post<Response>(this.loginURL, user)
  }
  logout(token: string): Observable<any> {
    const header = {
        'content-type': 'application/json',
        Authorization: token
    };
    this.httpOptions.headers = new HttpHeaders(header);
    return this.http.post<string>(this.logoutURL, {}, this.httpOptions);
}
}
