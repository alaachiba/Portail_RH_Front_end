import { AvanceSalaire } from './../entities/AvanceSalaire';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { environment } from '../../environments/environment';
import { ShowcaseDialogComponent } from '../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { User } from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class AvanceSalaireService {
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
        message: "Avance salaire added Successfully",
      },
    });
  }

  openDeletedSuccess() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        message: "Avance salaire deleted Successfully",
      },
    });
  }
  openUpdatedSuccess() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        message: "Avance salaire Updated Successfully",
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
    return this.http.get<AvanceSalaire[]>(environment.getAllAvance, this.httpOptions);
  }

  listmyAll() {
    return this.http.get<AvanceSalaire[]>(environment.getmyAllAvance + this.email, this.httpOptions);
  }
  async delete(id: number) {
    this.http.delete(environment.deleteAvance + id, this.httpOptions).subscribe(
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
    montant: number,
    demAvance: Date,
    user : User,
    statut:string,
    motif:string,
  ) {
    const authData = { id,montant,demAvance,statut,user,motif}
    this.http.put(environment.updateAvance, authData, this.httpOptions).subscribe(
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
    montant: number,
    user : User,
    demAvance: Date,
    statut:string,
    motif:string,
   
  ) {

    const authData = { montant,statut,demAvance,motif, user}
    this.http.post(environment.addAvance, authData, this.httpOptions).subscribe(
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
