import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { LocalDataSource } from 'ng2-smart-table';
import { InfosService } from '../../services/infos.service';

@Component({
  selector: 'ngx-list-demande-info',
  templateUrl: './list-demande-info.component.html',
  styleUrls: ['./list-demande-info.component.scss']
})
export class ListDemandeInfoComponent  {
  demandes: any = {};
  settings = {
    hideSubHeader: false,
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
      demModificationType: {
        title: "Type",
        type: "string",
        editable: false,
        width: "150px",
        valuePrepareFunction: (data) => {
          return data.type;
        },
      },
      description: {
        title: "Description",
        type: "string",
        editable: false,
      },
      statusDem: {
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
      motif: {
        title: "Motif",
        addable: false,
        editable: true,
        type: "string",
        editor: {
          type: "textarea",
        },
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

  constructor(
    private service: InfosService,
    private authService: NbAuthService
  ) {}

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token.getValue();
      }
    });
    this.service.listAll().subscribe((response) => {
      this.demandes = response;
      console.log(response);
      this.source.load(this.demandes);
    });
  }

  onEdit(event) {
    if (event.data.statusDem === "En Attente"|| event.data.statusDem == "En attente") {
      if (event.newData.statusDem == "Accepté") {
        if (window.confirm("Êtes-vous sûr d'accepter cette demande ?")) {
          this.service.update(
            event.data.id,
          event.data.description,
          "Accepté",
          event.data.dateDem,
          event.data.user,
          event.newData.motif,
          event.data.demModificationType,
          );
          console.log(event.newData);
          event.confirm.resolve(event.newData);
        } else {
          event.confirm.reject();
        }
      } else {
        if (window.confirm("Êtes-vous sûr de refuser cette demande ?")) {
          this.service.update(
            event.data.id,
            event.data.description,
            "Réfusé",
            event.data.dateDem,
            event.data.user,
            event.newData.motif,
            event.data.demModificationType,
          );

          event.confirm.resolve(event.newData);
        } else {
          event.confirm.reject();
        }
      }
    }
  }
}
