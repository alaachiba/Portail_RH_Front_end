import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { CongetypeService } from '../../services/congetype.service';

@Component({
  selector: 'ngx-conge-type',
  templateUrl: './conge-type.component.html',
  styleUrls: ['./conge-type.component.scss']
})
export class CongeTypeComponent implements OnInit {
  types: any = {};
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
      confirmSave:true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      type: {
        title: "Type",
        type: "string",
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  token: any;
  private httpOptions;

  constructor(
    private service: CongetypeService,
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
      this.types = response;
      console.log(response);
      this.source.load(this.types);
    });
  }

  onAddConfirm(event): void {
    console.log("Create clicked");
    if (window.confirm("Are you sure you want to add this Type?")) {
      this.service.add(
        event.newData.type,
      );

      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onUpdateConfirm(event): void {
    console.log(event.newData);
    if (window.confirm("Are you sure you want to edit this type?")) {
      this.service.update(
        event.newData.id,
        event.newData.type,
      );

      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    console.log(event.data.idUser);
    if (window.confirm("Are you sure you want to delete?")) {
      console.log(event.data.idUser);
      this.service.delete(event.data.id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
