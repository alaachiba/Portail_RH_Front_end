import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { CongeService } from '../../services/conge.service';
import { CongetypeService } from '../../services/congetype.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ngx-list-demande-conge',
  templateUrl: './list-demande-conge.component.html',
  styleUrls: ['./list-demande-conge.component.scss']
})
export class ListDemandeCongeComponent {
  demandes: any = {};
  listTypes: any = {};
  listUsers: any = {};
  i: number;
  settings = {
    hideSubHeader: true,
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    actions: {
      add: false,
      delete: false,
      position: "right",
    },
    columns: {
      dateDem: {
        title: "Date Création",
        type: "date",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return new DatePipe("en-US").transform(data, "dd/MM/YYYY hh:mm a");
        },
      },
      dateDeb: {
        title: "Date Début",
        type: "date",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return new DatePipe("en-US").transform(data, "dd/MM/YYYY hh:mm a");
        },
      },
      dateFin: {
        title: "Date Fin",
        type: "date",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return new DatePipe("en-US").transform(data, "dd/MM/YYYY hh:mm a");
        },
      },
      nbrJrs: {
        title: "Nombre de jour",
        type: "number",
        addable: false,
        editable: false,
      },
      demandeCongeType: {
        title: "Type",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
        //  console.log("HEdhi hiya lmochkla"+data.type)
          return data.type;
        },
      },
      idRemplacant: {
        title: "Remplacent",
        type: "html",
        addable: false,
        editable: false,
        sort: false,
        filter: false,
        
      },
      tacheDele: {
        title: "Tache",
        type: "string",
        addable: false,
        editable: false,
      },
      user: {
        title: "Employé",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return data.nom + " " + data.prenom;
        },
      },
      motif: {
        title: "Motif",
        addable:false,
        editable: true,
        type: "string",
      },
      status: {
        title: "Etat",
        addable: false,
        editable: true,
        type: "html",
        editor: {
          type: "list",
          config: {
            list: [
              { value: "Accepté", title: "Accepté" },
              { value: "Réfusé", title: "Réfusé" },
            ],
          },
        },
      },
    },
  };

  private httpOptions;
  source: LocalDataSource = new LocalDataSource();
  token: any;

  constructor(
    private service: CongeService,
    private typeService: CongetypeService,
    private router: Router,
    private http: HttpClient,
    private authService: NbAuthService,
    private userService: UserService,
    private dialogService: NbDialogService
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

    
    // LIST Users
    this.userService.listUsers().subscribe((data: any) => {
      this.listUsers = data;
     
    });
   

    this.service.listAll().subscribe((response) => {
      this.demandes = response;
      console.log(response);
      this.source.load(this.demandes);
    });
  }

  onEdit(event) {
    let newDate = new Date(event.data.dateDeb);
    newDate.setDate(newDate.getDate()+ Number(event.data.nbrJrs) );
    if (event.data.status === "En Attente"|| event.data.status == "En attente") {
      if (event.newData.status == "Accepté") {
        //alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`)

        if (window.confirm("Are you sure you want to accept this demande?")) {
          this.service.update(
            event.data.id,
            event.data.dateDeb,
            newDate,
            event.data.dateDem,
            event.data.nbrJrs,
            event.data.idRemplacant,
            event.data.tacheDele,
            "Accepté",
            event.data.demandeCongeType,
            event.newData.motif,
            event.data.user,
          );
          console.log(event.newData);
          event.confirm.resolve(event.newData);
        } else {
          event.confirm.reject();
        }
      } else {
        if (window.confirm("Are you sure you want to decline this demande?")) {
          this.service.update(
            event.data.id,
            event.data.dateDeb,
            newDate,
            event.data.dateDem,
            event.data.nbrJrs,
            event.data.idRemplacant,
            event.data.tacheDele,
            "Réfusé",
            event.data.demandeCongeType,
            event.newData.motif,
            event.data.user,
          );

          event.confirm.resolve(event.newData);
        } else {
          event.confirm.reject();
        }
      }
    }
  }

}
