import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { LocalDataSource } from 'ng2-smart-table';
import { FraisService } from '../../services/frais.service';

@Component({
  selector: 'ngx-list-demaide-frais',
  templateUrl: './list-demaide-frais.component.html',
  styleUrls: ['./list-demaide-frais.component.scss']
})
export class ListDemaideFraisComponent  {
  demandes: any = {};
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
      montant: {
        title: "Montant",
        type: "number",
        editable: false,
      },
      dateDem: {
        title: "Date de création",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return new DatePipe("en-US").transform(data, "dd/MM/YYYY hh:mm a");
        },
      },
      dateMission: {
        title: "Date de mission",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return new DatePipe("en-US").transform(data, "dd/MM/YYYY hh:mm a");
        },
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
        addable: false,
        editable: true,
        editor: {
          type: "textarea",
        },
      },
      statut: {
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
    private service: FraisService,
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
    if (event.data.statut === "En Attente"|| event.data.statut == "En attente") {
      if (event.newData.statut == "Accepté") {
        if (window.confirm("Êtes-vous sûr d'accepter cette demande ?")) {
          this.service.update(
            event.data.id,
            event.newData.montant,
            event.newData.dateMission,
            new Date(),
            "Accepté",
            event.newData.motif,
            event.data.user,
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
            event.newData.montant,
            event.newData.dateMission,
            new Date(),
            "Réfusé",
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
