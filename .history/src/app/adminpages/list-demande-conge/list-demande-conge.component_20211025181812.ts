import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { LocalDataSource } from 'ng2-smart-table';
import { CongeService } from '../../services/conge.service';
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
      user: {
        title: "Employé",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return data.nom + " " + data.prenom;
        },
      },
      dateDeb: {
        title: "Date de début",
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
          return data.type;
        },
      },
      idRemplacant: {
        title: "Employé remplacent",
        type: "html",
        addable: false,
        editable: false,
        sort: false,
        filter: false,
      },
      tacheDele: {
        title: "Tâche",
        type: "string",
        addable: false,
        editable: false,
      },
      motif: {
        title: "Motif",
        addable:false,
        editable: true,
        type: "string",
      },
      dateDem: {
        title: "Date de création",
        type: "date",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return new DatePipe("en-US").transform(data, "dd/MM/YYYY hh:mm a");
        },
      },
      status: {
        title: "État",
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

  source: LocalDataSource = new LocalDataSource();
  token: any;

  constructor(
    private service: CongeService,
    private authService: NbAuthService,
    private userService: UserService  ) {}

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token.getValue();
      }
    });

    
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
        if (window.confirm("Êtes-vous sûr d'accepter cette demande ?")) {
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
