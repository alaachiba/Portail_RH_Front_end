import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl = 'http://localhost:8080';

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
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":" Bearer,X-Requested-With,content-type",
            "Authorization": "Bearer "+this.token,
          }),
        };

        //console.log(this.httpOptions)
      }
    });
  }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}