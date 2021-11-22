import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { NbDialogService } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { CongeService } from "../../services/conge.service";
import { CongetypeService } from "../../services/congetype.service";
import { UserService } from "../../services/user.service";
import { ShowcaseDialogComponent } from "../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from "../smart-table-datepicker/smart-table-datepicker.component";

@Component({
  selector: "ngx-list-demande-conge",
  templateUrl: "./list-demande-conge.component.html",
  styleUrls: ["./list-demande-conge.component.scss"],
})
export class ListDemandeCongeComponent implements OnInit {
  demandes: any = {};
  listTypes: any = {};
  listUsers: any = {};
  i: number;
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
      dateDeb: {
        title: "Date Début",
        type: "custom",
        renderComponent: SmartTableDatepickerRenderComponent,
        width: "150px",
        filter: false,
        sortDirection: "desc",
        editor: {
          type: "custom",
          component: SmartTableDatepickerComponent,
        },
      },
      nbrJrs: {
        title: "Nombre de jours",
        type: "number",
      },
      demandeCongeType: {
        title: "Type",
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
          console.log(data);
          return data.type;
        },
      },
      idRemplacant: {
        title: "Employé remplacent",
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
      },
      tacheDele: {
        title: "Tache",
        type: "string",
        editable: true,
        editor: {
          type: "textarea",
        },
      },

      motif: {
        title: "Motif",
        addable: false,
        editable: false,
        type: "string",
      },
      status: {
        title: "Etat",
        addable: false,
        editable: false,
        type: "string",
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  token: any;
  date_now: Date;
  _currentUser: any = {};
  constructor(
    private service: CongeService,
    private typeService: CongetypeService,
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

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token.getValue();
      }
    });

    this.typeService.listAll().subscribe((data: any) => {
      this.listTypes = data;
      this.i = 0;
      data.forEach((d: any) => {
        this.settings.columns.demandeCongeType.editor.config.list.push({
          value: this.i,
          title: d.type,
        });
        this.i += 1;
      });
      this.i = 0;
      this.settings = Object.assign({}, this.settings);
      console.log(this.settings.columns.demandeCongeType.editor.config.list);
    });
    
    this.userService.listUsers().subscribe((data: any) => {
      this.listUsers = data;

      data.forEach((d: any) => {
        this.settings.columns.idRemplacant.editor.config.list.push({
          value: d.idUser,
          title: d.nom + " " + d.prenom,
        });
      });

      this.settings = Object.assign({}, this.settings);
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

  field() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "Error",
        message: "Veuillez completer tous les champs",
      },
    });
  }
  onAddConfirm(event): void {
    console.log("Add clicked");
    let newDate = new Date(event.newData.dateDeb);
    newDate.setDate(newDate.getDate() + Number(event.newData.nbrJrs));

    if (window.confirm("Are you sure you want to add this User?")) {
      if (
        event.newData.nbrJrs &&
        event.newData.tacheDele &&
        event.newData.demandeCongeType != -1 &&
        event.newData.idRemplacant != -1
      ) {
        this.service.add(
          event.newData.dateDeb,
          newDate,
          new Date(),
          event.newData.nbrJrs,
          event.newData.idRemplacant,
          event.newData.tacheDele,
          "En attente",
          this.listTypes[event.newData.demandeCongeType],
          "Vide",
          this._currentUser
        );

        event.newData.user = this._currentUser;
        event.newData.status = "En attente";
        event.newData.motif = "Vide";
        console.log(this.listTypes[event.newData.demandeCongeType].type);
        event.newData.demandeCongeType =
          this.listTypes[event.newData.demandeCongeType].type;
        event.newData.dateDem = new DatePipe("en-US").transform(
          new Date(),
          "dd/MM/YYYY hh:mm a"
        );

        event.confirm.resolve(event.newData);
      } else {
        this.field();
      }
    } else {
      event.confirm.reject();
    }
  }

  onUpdateConfirm(event): void {
    let newDate = new Date(event.newData.dateDeb);
    newDate.setDate(newDate.getDate() + Number(event.newData.nbrJrs));
    if (
      event.data.status == "En Attente" ||
      event.data.status == "En attente"
    ) {
      if (window.confirm("Are you sure you want to edit this demande?")) {
        if (
          event.newData.nbrJrs &&
          event.newData.tacheDele &&
          event.newData.demandeCongeType != -1 &&
          event.newData.idRemplacant != -1
        ) {
          this.service.update(
            event.data.id,
            event.newData.dateDeb,
            newDate,
            new Date(),
            event.newData.nbrJrs,
            event.newData.idRemplacant,
            event.newData.tacheDele,
            "En Attente",
            this.listTypes[event.newData.demandeCongeType],
            "Vide",
            this._currentUser
          );

          event.confirm.resolve(event.newData);
        } else {
          event.confirm.reject();
        }
      }else{
        this.field();
      }
    } else {
      this.open();
    }
  }

  onDeleteConfirm(event): void {
    console.log(event.data.id);
    if (window.confirm("Are you sure you want to delete?")) {
      this.service.delete(event.data.id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
