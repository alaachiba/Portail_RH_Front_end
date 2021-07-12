import { CongeType } from './../entities/CongeType';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CongetypeService {
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


  open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        message: "Congé Type added Successfully",
      },
    });
  }

  openDeletedSuccess() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        message: "Congé Type deleted Successfully",
      },
    });
  }
  openUpdatedSuccess() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        message: "Congé Type Updated Successfully",
      },
    });
  }

  ErrorWithColumn() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Verify",
        message: "Verify Your Column",
      },
    });
  }
  ErrorToken() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Access expired",
        message: "Your acces is expired try to connect again",
      },
    });
  }

  listAll() {
    return this.http.get<CongeType[]>(environment.getAllCongeType, this.httpOptions);
  }

  async delete(id: number) {
    this.http.delete(environment.deleteCongeType + id, this.httpOptions).subscribe(
      (res) => {
        console.log(res);
        this.openDeletedSuccess();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      }
    );
  }

  update(
    id: number,
    type: string,
  ) {
    const authData = { id,type}
    this.http.put(environment.updateCongeType, authData, this.httpOptions).subscribe(
      (response) => {
        this.openUpdatedSuccess();
      },
      (error: HttpErrorResponse) => {
        console.log("HTTPERROR");
        console.log(error);
        if (error.status == 400) {
          this.ErrorWithColumn();
        } else if (error.status == 500) {
          this.ErrorToken();
        } else if (error.status == 200) {
          this.openUpdatedSuccess();
        }
      }
    );
  }

  add(
    type: string,
  ) {
    const authData = { type}
    this.http.post(environment.addCongeType, authData, this.httpOptions).subscribe(
      (response) => {
        this.open();
      },
      (error: HttpErrorResponse) => {
        console.log("HTTPERROR");
        console.log(error);
        if (error.status == 400) {
          this.ErrorWithColumn();
        } else if (error.status == 500) {
          this.ErrorToken();
        } else if (error.status == 200) {
          this.open();
        }
      }
    );
  }
}
