import { DemandeFrais } from './../entities/DemandeFrais';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { environment } from '../../environments/environment';
import { User } from '../entities/User';
import { ShowcaseDialogComponent } from '../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FraisService {
  token: any;
  email:any;
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
        this.httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":" Bearer,X-Requested-With,content-type",
            "Authorization": "Bearer "+this.token,
          }),
        };
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
        message: "Demande Frais deleted Successfully",
      },
    });
  }
  openUpdatedSuccess() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        message: "Demande Frais Updated Successfully",
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
    return this.http.get<DemandeFrais[]>(environment.getDemandeFrais, this.httpOptions);
  }

  listmyAll() {
    return this.http.get<DemandeFrais[]>(environment.getmyDemandeFrais + this.email, this.httpOptions);
  }

  async delete(id: number) {
    this.http.delete(environment.deleteDemandeFrais + id, this.httpOptions).subscribe(
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
    dateMission: Date,
    dateDem: Date,
    statut: String,
    motif: String,
    user: User,
  ) {
    const authData = { id,montant,dateMission,dateDem,statut,motif, user}
    this.http.put(environment.updateDemandeFrais, authData, this.httpOptions).subscribe(
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
    dateMission: Date,
    dateDem: Date,
    statut: String,
    motif: String,
    user: User,
  ) {

    const authData = { montant,dateMission,dateDem,statut,motif, user}
    this.http.post(environment.addDemandeFrais, authData, this.httpOptions).subscribe(
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
