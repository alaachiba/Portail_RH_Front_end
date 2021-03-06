import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { InfosService } from '../../services/infos.service';
import { UserService } from '../../services/user.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-list-demande-info',
  templateUrl: './list-demande-info.component.html',
  styleUrls: ['./list-demande-info.component.scss']
})
export class ListDemandeInfoComponent implements OnInit {
  demandes: any = {};
  listTypes: any = {};
  i:number;
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
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      user: {
        title: "Employé",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return data.nom + " " + data.prenom;
        },
      },
      demModificationType: {
        title: "Le champ à modifier",
        type: "html",
        width: "150px",
        sort: false,
        filter:false,
        editor: {
          type: "list",
          config: {
            list: [
            ],
          },
        },
        valuePrepareFunction: (data) => {
          return data.type;
        },
      },
      description: {
        title: "Description",
        type: "string",
        editable: true,
        editor: {
          type: "textarea",
        },
      },
      statusDem: {
        title: "État",
        addable: false,
        editable: false,
        type: "string",
      },
      motif: {
        title: "Motif",
        addable: false,
        editable: false,
        type: "string",
      },
      dateDem: {
        title: "Date de création",
        width: "200px",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return new DatePipe("en-US").transform(data, "dd/MM/YYYY hh:mm a");
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  token: any;
  date_now: Date;
  _currentUser: any = {};
  constructor(
    private service: InfosService,
    private authService: NbAuthService,
    private userService: UserService,
    private dialogService: NbDialogService
  ) {}

  open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Error",
        message: "Vous ne pouvez pas changer cette demande",
      },
    });
  }

  field() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Error",
        message: "Veuillez remplir tous les champs",
      },
    });
  }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token.getValue();
      }
    });
    this.service.listAllTypes().subscribe((data: any)=> {
      this.listTypes = data;
      
      this.i = 0;
        data.forEach((d: any)=>{
          this.settings.columns.demModificationType.editor.config.list.push({value: this.i, title:d.type});
          this.i +=1;
        });
        this.i = 0;
        this.settings = Object.assign({}, this.settings);
        console.log(this.settings.columns.demModificationType.editor.config.list)
      });
    this.service.listmyAll().subscribe((response) => {
      this.demandes = response;
      console.log(response);
      this.source.load(this.demandes);
    });
    this.userService.getCurrentUser().subscribe((user) => {
      this._currentUser = user;
      console.log(this._currentUser);
    });
    
    
  }

  onAddConfirm(event): void {
    console.log("Add clicked");
    
    if (window.confirm("Êtes-vous sûr de passer cette demande ?")) {

      if((event.newData.description && event.newData.demModificationType!=-1)){
        this.service.add(
          event.newData.description,
          "En attente",
          new Date(),
          this._currentUser,
          "Vide",
          this.listTypes[event.newData.demModificationType],
          
        );
  
        event.newData.user = this._currentUser;
        event.newData.statusDem = "En attente";
        event.newData.motif = "Vide";
        console.log(this.listTypes[event.newData.demModificationType].type);
        event.newData.demModificationType = this.listTypes[event.newData.demModificationType].type;
        event.newData.dateDem = new DatePipe("en-US").transform(
          new Date(),
          "dd/MM/YYYY hh:mm a"
        );
  
        event.confirm.resolve(event.newData);
      }else{
        this.field()
      }

     
    } else {
      event.confirm.reject();
    }
  }

  onUpdateConfirm(event): void {
    console.log(event.newData);
    if (
      event.data.statusDem == "En Attente" ||
      event.data.statusDem == "En attente"
    ) {
      if (window.confirm("Êtes-vous sûr de modifier cette demande ?")) {
        if((event.newData.description && event.newData.demModificationType!=-1)){
        this.service.update(
          event.data.id,
          event.newData.description,
          "En attente",
          new Date(),
          this._currentUser,
          "Vide",
          this.listTypes[event.newData.demModificationType],
        );

        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }}
      else{
        this.field()
      }
    } else {
      this.open();
    }
  }

  onDeleteConfirm(event): void {
    console.log(event.data.id);
    if (window.confirm("Êtes-vous sûr de supprimer cette demande ?")) {
      this.service.delete(event.data.id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
