import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl = 'http://localhost:8080';
  email: any;
  token: any;
  private httpOptions;
  constructor(
    private http: HttpClient,
    private authService: NbAuthService,
    private dialogService: NbDialogService
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token.getValue();
        //console.log(token.getValue())
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': undefined,
            "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":" Bearer,X-Requested-With,content-type",
            "Authorization": "Bearer "+this.token,
          }),
        };
      }
    });
  }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/rest/api/file/upload`, formData, this.httpOptions);

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/rest/api/file/files`,this.httpOptions);
  }
}