import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { NbDialogService } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { ShowcaseDialogComponent } from "../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import { UserService } from "../../services/user.service";

@Component({
  selector: "ngx-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.scss"],
})
export class ListUsersComponent implements OnInit {
  users: any = {};
  listRoles: any = {};  i: number;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    
    columns: {
      nom: {
        title: "Nom",
        type: "string",
      },
      prenom: {
        title: "Prénom",
        type: "string",
      },
      matricule: {
        title: "Matricule",
        type: "string",
      },
      email: {
        title: "E-mail",
        type: "string",
      },
      roles: {
        title: "Role",
        type: "html",
        width: "150px",
        sort: false,
        filter: false,
        editor: {
          type: "list",
          config: {
            list: [],
          },
        },
        valuePrepareFunction: (data) => {
         
          return data
        },
      },
      Actions: 
    {
      title:'Detail',
      editable:false,
      addable: false,
      type:'html',
      valuePrepareFunction:(cell,row)=>{
        return `<a title="See Profile" href="admin/profile-user/${row.email}"> <i class="fa fa-eye"></i></a>`
      },
      filter:false       
    },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  token: any;
  private httpOptions;

  constructor(
    private service: UserService,
    private router: Router,

    private http: HttpClient,
    private authService: NbAuthService,private dialogService: NbDialogService
  ) {}

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

    this.service.listRoles().subscribe((data: any) => {
      this.listRoles = data;
      this.i = 0;
      console.log(data)
      data.forEach((d: any) => {
        this.settings.columns.roles.editor.config.list.push({
          value: this.i,
          title: d.libelle,
        });
        this.i += 1;
      });
      this.i = 0;
      this.settings = Object.assign({}, this.settings);
      console.log(this.settings.columns.roles.editor.config.list);
    });

    this.service.listUsers().subscribe((response) => {
      this.users = response;
      console.log(response);
      this.source.load(this.users);
    });
  }

  field() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Error",
        message: "Veuillez completer tous les champs",
      },
    });
  }
  onAddConfirm(event): void {
    console.log("Create clicked");
    if (window.confirm("Are you sure you want to add this User?")) {
      if (event.newData.nom && 
        event.newData.prenom &&
        event.newData.matricule &&
        event.newData.email &&
        event.newData.roles !=-1
        ){
          this.service.CreateUser(
            event.newData.nom,
            event.newData.prenom,
            event.newData.matricule,
            event.newData.email,
            this.listRoles[event.newData.roles],
            "0",
            event.newData.prenom + event.newData.nom
          );
    
          event.confirm.resolve();
        }else{
          this.field()}
      
    } else {
      event.confirm.reject();
    }
  }

  onUpdateConfirm(event): void {
    console.log(event.newData);
    if (window.confirm("Are you sure you want to edit this User?")) {

      if (event.newData.nom && 
        event.newData.prenom &&
        event.newData.matricule &&
        event.newData.email
        ){
      this.service.UpdateUser(
        event.newData.idUser,
        event.newData.nom,
        event.newData.prenom,
        event.newData.matricule,
        event.newData.email,
        this.listRoles[event.newData.roles],
        event.newData.username,
        event.newData.status,
        event.data.pwd
      );

      event.confirm.resolve(event.newData);}
      else{
        this.field();
        
      }
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    console.log(event.data.idUser);
    if (window.confirm("Are you sure you want to delete?")) {
      console.log(event.data.idUser);
      this.service.deleteUser(event.data.idUser);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
