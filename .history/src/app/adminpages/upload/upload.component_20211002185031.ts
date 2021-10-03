


import { HttpEventType, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Component, EventEmitter, OnInit } from "@angular/core";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { User } from "../../entities/User";
import { UploadFileService } from "../../services/upload-file.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "ngx-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"],
})
export class UploadComponent implements OnInit {
 

  listUsers: any  = [];
  selectedUser: any;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFileService, private userService: UserService) { }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
    this.userService.listUsers().subscribe((response) => {
      this.listUsers = response.map(
        x => {
          return {
            id: x.idUser,
            name: x.nom + " "+ x.prenom
           
          };
        }
      );
    });
  }
  changeUser($event){
    this.selectedUser  = this.listUsers.find(user => user.id=== $event.id);
    console.log(this.selectedUser)
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }
}
