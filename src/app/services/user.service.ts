import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { NbDialogService } from "@nebular/theme";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Role } from "../entities/Role";
import { RoleEntity } from "../entities/RoleEntity";
import { User } from "../entities/User";
import { ShowcaseDialogComponent } from "../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component";


@Injectable({
  providedIn: "root",
})
export class UserService {
  token: any;
  email: string;
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
        console.log(this.email);
      }
    });
  }

 open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        message: "User added Successfully",
      },
    });
  }

  openDeletedSuccess() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        message: "User deleted Successfully",
      },
    });
  }
  openUpdatedSuccess() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        message: "User Updated Successfully",
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

  CreateUser(
    nom: string,
    prenom: string,
    matricule: number,
    email: string,
    rolez: string[],
    status: string,
    pwd: String
  ) {
    let role = [rolez]
    const authData = { nom, prenom, matricule, email, role, status, pwd }
    console.log(role)
    this.http.post(environment.signup, authData, this.httpOptions).subscribe(
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

  UpdateUser(
    idUser: number,
    nom: string,
    prenom: string,
    matricule: number,
    email: string,
    role: string[],
    username: string,
    status: string,
    pwd: String
  ) {
    const authData = { idUser,nom, prenom, matricule, email, role,username, status, pwd }
    this.http.put(environment.editUser, authData, this.httpOptions).subscribe(
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

  listUsers(): Observable<User[]> {
    
    return this.http.get<User[]>(environment.getAllUsers, this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":" Bearer,X-Requested-With,content-type",
        "Authorization": "Bearer "+this.token,
      }),
    });
  }

  listRoles(): Observable<Role[]> {
    
    return this.http.get<Role[]>(environment.getAllRoles, this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":" Bearer,X-Requested-With,content-type",
        "Authorization": "Bearer "+this.token,
      }),
    });
  }

  getCurrentUser() {
    //console.log("User service"+this.authService.getToken())
    return this.http.get<User[]>(environment.me+this.email, this.httpOptions);
  }

  getUser(email) {
    //console.log("User service"+this.authService.getToken())
    return this.http.get<User[]>(environment.me+email, this.httpOptions);
  }

  async deleteUser(id: number) {
    this.http.delete(environment.deleteUser + id, this.httpOptions).subscribe(
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
}
