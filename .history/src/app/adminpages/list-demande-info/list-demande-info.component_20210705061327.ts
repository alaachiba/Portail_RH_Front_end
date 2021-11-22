import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
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
      description: {
        title: "Description",
        type: "string",
        editable: false,
        
      },
      dateDem: {
        title: "Date création",
        width: "200px",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return new DatePipe("en-US").transform(data, "dd/MM/YYYY hh:mm a");
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
        type: "string",
        editor: {
          type: "textarea",
        },
      },
      statusDem: {
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
    private service: InfosService,
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
    if (event.data.statusDem === "En Attente"|| event.data.statusDem == "En attente") {
      if (event.newData.statusDem == "Accepté") {
        //alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`)

        if (window.confirm("Are you sure you want to accept this demande?")) {
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
        if (window.confirm("Are you sure you want to decline this demande?")) {
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
