import { InfoType } from './../entities/InfoType';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { environment } from '../../environments/environment';
import { DemandeInfos } from '../entities/DemandeInfos';
import { User } from '../entities/User';
import { ShowcaseDialogComponent } from '../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class InfosService {
  token: any;
  email: any;
  private httpOptions;
  constructor(
    private http: HttpClient,
    private authService: NbAuthService,
    private dialogService: NbDialogService
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.email = token.getPayload().sub;
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


  open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        message: "Demande Info added Successfully",
      },
    });
  }

  openDeletedSuccess() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        message: "Demande Info deleted Successfully",
      },
    });
  }
  openUpdatedSuccess() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        message: "Demande Info Updated Successfully",
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
    return this.http.get<DemandeInfos[]>(environment.getDemandeInfos, this.httpOptions);
  }
  listmyAll() {
    return this.http.get<DemandeInfos[]>(environment.getmyDemandeInfos + this.email, this.httpOptions);
  }
  listAllTypes() {
    return this.http.get<InfoType[]>(environment.getDemandeInfosTypes, this.httpOptions);
  }

  async delete(id: number) {
    this.http.delete(environment.deleteDemandeInfos + id, this.httpOptions).subscribe(
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
    description: String,
    statusDem: String,
    dateDem: Date,
    user: User,
    motif: String,
    demModificationType: InfoType
  ) {
    const authData = { id,description,statusDem,dateDem,user,motif, demModificationType}
    this.http.put(environment.updateDemandeInfos, authData, this.httpOptions).subscribe(
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
    description: String,
    statusDem: String,
    dateDem: Date,
    user: User,
    motif: String,
    demModificationType: InfoType
  ) {

    const authData = { description,statusDem,dateDem,user,motif, demModificationType}
    this.http.post(environment.addDemandeInfos, authData, this.httpOptions).subscribe(
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
