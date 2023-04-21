import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoleService } from 'src/app/share/service/role.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HOST_PRODUCT } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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

    const headerImage = {
      // 'Content-Type': 'multipart/form-data',
      authorization: roleService.getToken()
    };
    this.httpOptionsImage = {
      headers: new HttpHeaders(headerImage)
    };
  }

  getCategories(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_PRODUCT + 'productcategories/get', payload, this.httpOptions).pipe(
      catchError(this.handleError('get productcategories', payload))
    );
  }

  insertCategories(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_PRODUCT + 'productcategories/insert', payload, this.httpOptions).pipe(
      catchError(this.handleError('insert productcategories', payload))
    );
  }

  updateCategories(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_PRODUCT + 'productcategories/update', payload, this.httpOptions).pipe(
      catchError(this.handleError('update productcategories', payload))
    );
  }

  excelCategories(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_PRODUCT + 'productcategories/insertexcel', payload, this.httpOptions).pipe(
      catchError(this.handleError('insertexcel productcategories', payload))
    );
  }

  getProduct(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_PRODUCT + 'product/get', payload, this.httpOptions).pipe(
      catchError(this.handleError('get product', payload))
    );
  }

  insertProduct(payload: FormData): Observable<any> {
    return this.http.post<Response>(HOST_PRODUCT + 'product/insert', payload, this.httpOptionsImage).pipe(
      catchError(this.handleError('insert product', payload))
    );
  }

  updateProduct(payload: FormData): Observable<any> {
    return this.http.post<Response>(HOST_PRODUCT + 'product/update', payload, this.httpOptionsImage).pipe(
      catchError(this.handleError('update product', payload))
    );
  }

  reloadProduct(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_PRODUCT + 'product/reload', payload, this.httpOptions).pipe(
      catchError(this.handleError('reload product', payload))
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
