import { HttpHeaders } from "@angular/common/http";
import { Component, EventEmitter, OnInit } from "@angular/core";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { User } from "../../entities/User";
import { UserService } from "../../services/user.service";

@Component({
  selector: "ngx-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"],
})
export class UploadComponent implements OnInit {
  selected ;
  listUsers: any  = [];
  options = [
    { value: 1, name: '1' },
    { value: 2, name: '2' },
    { value: 3, name: '3' },
  ];
  private httpOptions;
  token: any;
  public uploader: FileUploader = new FileUploader({
    url: environment.upload,
    itemAlias: "file",
  });
  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token.getValue();
        this.httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            auth: this.token,
          }),
        };
      }
    });

    this.userService.listUsers().subscribe((response) => {
      this.listUsers = response.map(
        x => {
          return {
            value: x.idUser,
            name: x.nom + " "+ x.prenom
           
          };
        }
      );
      console.log(this.listUsers)
      console.log(this.options);
    });
  

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log("FileUpload:uploaded successfully:", item, status, response);
      alert("Your file has been uploaded successfully");
    };
  }

  constructor(
    private authService: NbAuthService,
    private userService: UserService
  ) {

   // this.selected=this.listUsers[0];
    this.selected=this.options[0];
  }
}
