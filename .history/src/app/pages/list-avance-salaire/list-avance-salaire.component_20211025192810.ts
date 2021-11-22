import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { NbDialogService } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { AvanceSalaireService } from "../../services/avance-salaire.service";
import { UserService } from "../../services/user.service";
import { ShowcaseDialogComponent } from "../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";

@Component({
  selector: "ngx-list-avance-salaire",
  templateUrl: "./list-avance-salaire.component.html",
  styleUrls: ["./list-avance-salaire.component.scss"],
})
export class ListAvanceSalaireComponent implements OnInit {
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
      montant: {
        title: "Montant",
        type: "number",
      },
      statut: {
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
      demAvance: {
        title: "Date de création",
        addable: false,
        editable: false,
        valuePrepareFunction: (data) => {
          return new DatePipe("en-US").transform(data, "dd/MM/YYYY hh:mm:ss");
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  token: any;
  date_now: Date;
  _currentUser: any = {};
  constructor(
    private service: AvanceSalaireService,
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

      if (!event.newData.montant){
        this.field()
      }
      else{
        this.service.add(
          event.newData.montant,
          this._currentUser,
          new Date(),
          "En attente",
          "Vide"
        );
  
        event.newData.user = this._currentUser;
        event.newData.statut = "En attente";
        event.newData.motif = "Vide";
  
        event.newData.demAvance = new DatePipe("en-US").transform(
          new Date(),
          "dd/MM/YYYY hh:mm:ss"
        );
  
        event.confirm.resolve(event.newData);
      }
      
    } else {
      event.confirm.reject();
    }
  }

  onUpdateConfirm(event): void {
    console.log(event.newData);
    if (event.data.statut == "En Attente" || event.data.statut == "En attente"){
      if (window.confirm("Êtes-vous sûr de modifier cette demande ?")) {

        if (!event.newData.montant){
          this.field()
        }
        else{
          this.service.update(
            event.data.id,
            event.newData.montant,
            new Date(),
            event.data.user,
            event.data.statut,
            event.data.motif
          );
    
          event.confirm.resolve(event.newData);
        }
        
      } else {
        event.confirm.reject();
      }
    }else{
      this.open() ;
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
