import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../services/user.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  currentpassword: any = {};
  imageSrc = 'assets/images/smartup.png'  

  newpassword: any = {};
  confirmpassword: any = {};
  private httpOptions;
  token: any;
  constructor(private dialogService: NbDialogService,private authService: NbAuthService,
    private userService: UserService,) { }

 
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

}
