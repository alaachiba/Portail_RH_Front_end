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
upload(file:any){
  let params = new HttpParams();
  params = params.append('uploadedFiles', file);
  // params = params.append(''id_company'', id_company);
  return this.http.post<any>(this.uploadf, {params}, {
    headers: new HttpHeaders({
      "Content-Type": "application/json,multipart/form-data",
      "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":" Bearer,X-Requested-With,content-type",
      "Authorization": "Bearer "+this.token,
    })}
    );
}
/*  upload(file: any[]){
    const formdata = new FormData();
    for (const i of file) {
      formdata.append('uploadedFiles', i);
    }
    console.log(file);

    return this.http.post(this.uploadf, formdata,  {
      headers: new HttpHeaders({
 
        "Content-Type": "application/json,multipart/form-data",
        "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":" Bearer,X-Requested-With,content-type",
        "Authorization": "Bearer "+this.token,
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return {status: 'progress', message: progress};

          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );

   }
*/
  getFiles(): Observable<any> {
    return this.http.get(this.files, this.httpOptions);
  }
}