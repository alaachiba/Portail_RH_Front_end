import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { LocalDataSource } from "ng2-smart-table";
import { SmartTableData } from "../../@core/data/smart-table";
import { AvanceSalaireService } from "../../services/avance-salaire.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "ngx-list-avance-salaire",
  templateUrl: "./list-avance-salaire.component.html",
  styleUrls: ["./list-avance-salaire.component.scss"],
})
export class ListAvanceSalaireComponent {
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
      demAvance: {
        title: "Date de création",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return new DatePipe("en-US").transform(data, "dd/MM/YYYY hh:mm:ss");
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
        title: "Motif de refus",
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

  private httpOptions;
  source: LocalDataSource = new LocalDataSource();
  token: any;

  constructor(
    private service: AvanceSalaireService,
    private router: Router,
    private http: HttpClient,
    private authService: NbAuthService
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
            event.data.montant,
            event.data.demAvance,
            event.data.user,
            "Accepté",
            event.newData.motif
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
            event.data.montant,
            event.data.demAvance,
            event.data.user,
            "Réfusé",
            event.newData.motif
          );

          event.confirm.resolve(event.newData);
        } else {
          event.confirm.reject();
        }
      }
    }
  }
}
