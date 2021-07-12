import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { UserService } from '../../services/user.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  user: any = {};
  currentpassword: any = {};
  imageSrc = 'assets/images/smartup.png'  
   email : any ;
  newpassword: any = {};
  confirmpassword: any = {};
  private httpOptions;
  token: any;
  constructor(private dialogService: NbDialogService,private authService: NbAuthService,
    private userService: UserService,private routes: ActivatedRoute) { 

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

    this.routes.params.subscribe(params => {
      //this.id = +params.get('id');
      this.email = params.email;
      console.log(this.email);     
});
   
    this.userService.getUser(this.email).subscribe((user) => {
      this.user = user;
      //console.log(this.user);
    });
  }

}
