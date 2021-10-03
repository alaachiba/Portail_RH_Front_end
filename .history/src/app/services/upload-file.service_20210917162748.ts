import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  token: any;
  private httpOptions;
  private uploadf = environment.upload;
  private files = environment.getFiles;
  
  constructor(
    private http: HttpClient,
    private authService: NbAuthService,
    private dialogService: NbDialogService
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token.getValue();
        this.httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":" Bearer,X-Requested-With,content-type",
            "Authorization": "Bearer "+this.token,
          }),
        };
        console.log(this.httpOptions)
      }
    });
  }

  upload(file: File): Observable<HttpEvent<any>> {
    console.log(file);
    const formData: FormData = new FormData();

    formData.append('file', file);
    return this.http.post<any>(this.uploadf, {formData});
  }

  getFiles(): Observable<any> {
    return this.http.get(this.files);
  }
}