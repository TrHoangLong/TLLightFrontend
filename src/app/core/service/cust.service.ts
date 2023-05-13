import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoleService } from 'src/app/share/service/role.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HOST_CUST } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class CustService {

  httpOptions = {
    headers: null
  };

  httpOptionsImage = {
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

  getCustUser(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'customeruser/get', payload, this.httpOptions).pipe(
      catchError(this.handleError('get customeruser', payload))
    );
  }

  insertCustUser(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'customeruser/insert', payload, this.httpOptions).pipe(
      catchError(this.handleError('insert customeruser', payload))
    );
  }

  updateCustUser(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'customeruser/update', payload, this.httpOptions).pipe(
      catchError(this.handleError('update customeruser', payload))
    );
  }

  deleteCustUser(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'customeruser/delete', payload, this.httpOptions).pipe(
      catchError(this.handleError('delete customeruser', payload))
    );
  }

  getCustCart(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'custcart/get', payload, this.httpOptions).pipe(
      catchError(this.handleError('get custcart', payload))
    );
  }

  getCustOrders(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'custorders/get', payload, this.httpOptions).pipe(
      catchError(this.handleError('get custorders', payload))
    );
  }

  updateStatusCustOrders(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'custorders/updatestatus', payload, this.httpOptions).pipe(
      catchError(this.handleError('updatestatus custorders', payload))
    );
  }

  cancelCustOrders(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'custorders/cancel', payload, this.httpOptions).pipe(
      catchError(this.handleError('cancel custorders', payload))
    );
  }

  cancelConfirmCustOrders(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'custorders/cancelconfirm', payload, this.httpOptions).pipe(
      catchError(this.handleError('cancelconfirm custorders', payload))
    );
  }

  getHistCustOrders(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'custorders/gethist', payload, this.httpOptions).pipe(
      catchError(this.handleError('gethist custorders', payload))
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
