import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ModalComponent } from './modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { HTTPService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../shared/url.service';
import { AdminFormat } from '../shared/user.interfaces';

@Component({
  selector: 'admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  @ViewChild('actionTrigger') actionTrigger!: MatMenuTrigger;
  @ViewChild(MatTable) matTable!: MatTable<AdminFormat>;

  displayedColumns: string[] = ['admin_name', 'email', 'role', 'action'];
  dataSource!: AdminFormat[];

  constructor(
    private matDialog: MatDialog,
    private http: HTTPService,
    private toast: ToastrService,
    private api: UrlService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get(this.api.AdminURL).subscribe({
      next: (response) => {
        const data: any = response;
        this.dataSource = data;
      },
      error: (error) => {
        console.log('Error occoured', error);
        this.toast.error('Error in getting Members from Server');
      },
    });
  }

  openDialog() {
    const dialogRef = this.matDialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.add(this.api.AdminURL, result).subscribe({
          next: (response) => {
            this.toast.success('Admin Added Successfully');
            this.getData();
            this.matTable.renderRows();
          },
          error: (error) => {
            console.log('Error Occoured while adding member', error);
            this.toast.error('Adding Admin failed!', error);
          },
        });
      }
    });
  }

  handleDelteAdmin(id: number) {
    this.http.delete(`${this.api.AdminURL}/${id}`).subscribe({
      next: (response: any) => {
        this.getData();
        this.matTable.renderRows();
        setTimeout(() => {
          this.toast.success(response.message);
        }, 1000);
      },
      error: (error) => {
        console.error('Error Occoured', error);
      },
    });
  }
}
