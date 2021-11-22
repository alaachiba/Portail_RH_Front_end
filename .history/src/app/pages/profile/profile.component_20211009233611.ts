import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, NgZone } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../services/user.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //cloudinary
  
  @Input()
  responses: Array<any>;

  private hasBaseDropZoneOver: boolean = false;
  private uploader: FileUploader;
  private title: string;
  //end
  user: any = {};
  currentpassword: any;
  imageSrc = 'assets/images/smartup.png'  

  newpassword: any ;
  confirmpassword: any ;
  private httpOptions;
  token: any;
  constructor(private dialogService: NbDialogService,private authService: NbAuthService,
    private userService: UserService,private cloudinary: Cloudinary, 
    private zone: NgZone,private http: HttpClient) { 
      this.responses = [];
      this.title = '';
    }

 
  open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Success",
        //message: "User added Successfully",
      },
    });
  }
  ngOnInit(): void {
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
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
      //console.log(this.user);
    });
    //cloudinary
    
    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);

      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };


  
}
fileOverBase(e: any): void {
  this.hasBaseDropZoneOver = e;
}
  changeUserPassword($event) {
    this.currentpassword;  
    this.newpassword;
    this.confirmpassword;
    return (this.newpassword === this.confirmpassword)? this.userService.changeuserpassword(this.user.idUser,this.currentpassword,this.newpassword) : alert('verify the password and it confirmation!')
  }
}
