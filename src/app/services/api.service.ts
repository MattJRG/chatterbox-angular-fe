import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

  noAuthHeader = { 'NoAuth': 'True' };

    constructor(private http: HttpClient) {
    }

    public get(path: string, noAuth?): Observable<Object> {
      let headers = new HttpHeaders({ });
      if (noAuth) {
        headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'NoAuth': 'True'
        });
      } else {
        headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
      }

      return this.http.get(path, { headers: headers, observe: 'response' })
    }

    public post(path: string, body: any, noAuth?): Observable<Object> {
      let headers = new HttpHeaders({ });
      if (noAuth) {
        console.log('Using noAuth');
        headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'NoAuth': 'True'
        });
      } else {
        headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
      }

      return this.http.post(path, body, { headers: headers, observe: 'response' })
    }

    public put(path: string, body: any, noAuth?): Observable<Object> {
      let headers = new HttpHeaders({
          'Content-Type': 'application/json'
      });

      return this.http.put(path, body, { headers: headers, observe: 'response' })
    }

    public delete(path: string, noAuth?): Observable<Object> {
      let headers = new HttpHeaders({
          'Content-Type': 'application/json'
      });

      return this.http.delete(path, { headers: headers, observe: 'response' })
    }

    public upload(path: string, files: File[], extraParams: { [key: string]: string }, customHeaders?): Observable<Object> {
      const formData: FormData = new FormData();
      let headers = new HttpHeaders({});

      if (files.length > 0) {
          formData.append('attachment', files[0], files[0].name);
      }

      if (extraParams) {
          Object.keys(extraParams).forEach(key => {
              ;
              formData.append(key, extraParams[key]);
          });
      }

      const req = new HttpRequest('POST', path, formData, {
          headers: headers,
          reportProgress: true
      });

      return this.http.request(req)
    }

    // Error handling
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}
