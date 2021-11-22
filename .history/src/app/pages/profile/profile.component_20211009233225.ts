import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input  } from '@angular/core';
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
    private zone: NgZone,private http: HttpClient) { }

 
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
  }
  changeUserPassword($event) {
    this.currentpassword;  
    this.newpassword;
    this.confirmpassword;
    return (this.newpassword === this.confirmpassword)? this.userService.changeuserpassword(this.user.idUser,this.currentpassword,this.newpassword) : alert('verify the password and it confirmation!')
  }
}
