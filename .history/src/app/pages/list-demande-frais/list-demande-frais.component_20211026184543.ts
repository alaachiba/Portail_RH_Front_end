import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { NbDialogService } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { FraisService } from "../../services/frais.service";
import { UserService } from "../../services/user.service";
import { ShowcaseDialogComponent } from "../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from "../smart-table-datepicker/smart-table-datepicker.component";

@Component({
  selector: "ngx-list-demande-frais",
  templateUrl: "./list-demande-frais.component.html",
  styleUrls: ["./list-demande-frais.component.scss"],
})
export class ListDemandeFraisComponent implements OnInit {
  demandes: any = {};
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
      dateMission: {
        title: "Date de mission",
        type: "custom",
        renderComponent: SmartTableDatepickerRenderComponent,
        width: "250px",
        filter: false,
        sortDirection: "desc",
        editor: {
          type: "custom",
          component: SmartTableDatepickerComponent,
        },
      },
      montant: {
        title: "Montant",
        type: "number",
      },
      motif: {
        title: "Motif",
        addable: false,
        editable: false,
        type: "string",
      },
      statut: {
        title: "État",
        addable: false,
        editable: false,
        type: "string",
      },
      dateDem: {
        title: "Date de création",
        width: "250px",
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
    private service: FraisService,
    private authService: NbAuthService,
    private userService: UserService,
    private dialogService: NbDialogService
  ) {
    this.userService.getCurrentUser().subscribe((user) => {
      this._currentUser = user;
    });
  }

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
        message: "Veuillez remplir tous les champs",
      },
    });
  }

  onAddConfirm(event): void {
    console.log("Add clicked");

    if (window.confirm("Êtes-vous sûr de passer cette demande ?")) {
      if(event.newData.montant){
        this.service.add(
          event.newData.montant,
          event.newData.dateMission,
          new Date(),
          "En attente",
          "Vide",
          this._currentUser
        );
  
        event.newData.user = this._currentUser;
        event.newData.statut = "En attente";
        event.newData.motif = "Vide";
  
        event.newData.dateDem = new DatePipe("en-US").transform(
          new Date(),
          "dd/MM/YYYY hh:mm a"
        );
  
        event.confirm.resolve(event.newData);
      }else{
        this.field();
      }
      
    } else {
      event.confirm.reject();
    }
  }

  onUpdateConfirm(event): void {
    console.log(event.newData);
    if (
      event.data.statut == "En Attente" ||
      event.data.statut == "En attente"
    ) {
      if (window.confirm("Êtes-vous sûr de modifier cette demande ?")) {
        if (event.newData.montant){
          this.service.update(
            event.data.id,
            event.newData.montant,
            event.newData.dateMission,
            new Date(),
            event.data.statut,
            event.data.motif,
            event.data.user
          );
  
          event.confirm.resolve(event.newData);
        } else {
          event.confirm.reject();
        }
        }else{
          this.field()}
        
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
