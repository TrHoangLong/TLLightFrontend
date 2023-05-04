import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RoleService } from 'src/app/share/service/role.service';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HOST_SYSTEM } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class SysService {
  httpOptions = {
    headers: null
  };

  setHeader(header: any): void {
    this.httpOptions = header;
  }

  constructor(private http: HttpClient, private roleService: RoleService) {
    const header = {
      'content-type': 'application/json',
      authorization: roleService.getToken()
    };
    this.httpOptions = {
      headers: new HttpHeaders(header)
    };
  }

  getSysUser(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_SYSTEM + 'sysuser/get', payload, this.httpOptions).pipe(
      catchError(this.handleError('get sysuser', payload))
    );
  }

  insertSysUser(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_SYSTEM + 'sysuser/insert', payload, this.httpOptions).pipe(
      catchError(this.handleError('insert sysuser', payload))
    );
  }

  deleteSysUser(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_SYSTEM + 'sysuser/delete', payload, this.httpOptions).pipe(
      catchError(this.handleError('delete sysuser', payload))
    );
  }

  addCart(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_SYSTEM + 'syscart/insert', payload, this.httpOptions).pipe(
      catchError(this.handleError('insert syscart', payload))
    );
  }

  updateCart(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_SYSTEM + 'syscart/update', payload, this.httpOptions).pipe(
      catchError(this.handleError('update syscart', payload))
    );
  }

  deleteCart(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_SYSTEM + 'syscart/delete', payload, this.httpOptions).pipe(
      catchError(this.handleError('delete syscart', payload))
    );
  }

  orderCart(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_SYSTEM + 'syscart/order', payload, this.httpOptions).pipe(
      catchError(this.handleError('delete syscart', payload))
    );
  }

  getCart(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_SYSTEM + 'syscart/get', payload, this.httpOptions).pipe(
      catchError(this.handleError('delete syscart', payload))
    );
  }

  updateStatusSysOrder(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_SYSTEM + 'sysorder/updatestatus', payload, this.httpOptions).pipe(
      catchError(this.handleError('updatestatus sysorder', payload))
    );
  }

  orderSysOrder(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_SYSTEM + 'sysorder/order', payload, this.httpOptions).pipe(
      catchError(this.handleError('order sysorder', payload))
    );
  }

  getSysOrder(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_SYSTEM + 'sysorder/get', payload, this.httpOptions).pipe(
      catchError(this.handleError('get sysorder', payload))
    );
  }

  cancelSysOrder(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_SYSTEM + 'sysorder/cancel', payload, this.httpOptions).pipe(
      catchError(this.handleError('cancel sysorder', payload))
    );
  }

  private handleError<T>(operation = 'operation', result?): any {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    // console.log(`Mstservice: ${message}`);
  }
}
