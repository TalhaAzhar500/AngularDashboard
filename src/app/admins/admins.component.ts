import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ModalComponent } from './modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { HTTPService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../shared/url.service';
import { MemberFormat } from '../shared/user.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  @ViewChild('actionTrigger') actionTrigger!: MatMenuTrigger;
  @ViewChild(MatTable) matTable!: MatTable<MemberFormat>;

  displayedColumns: string[] = ['admin_name', 'email', 'role', 'action'];
  dataSource!: MemberFormat[];
  membersData!: MemberFormat[];
  search!: MemberFormat[];
  loading: boolean = false;
  tableLoading: boolean = true;

  constructor(
    private matDialog: MatDialog,
    private http: HTTPService,
    private toast: ToastrService,
    private api: UrlService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue: any = (event.target as HTMLInputElement).value;
    const data = this.search.filter((data) => {
      return filterValue.toLowerCase() === ''
        ? data
        : data.name.toLowerCase().includes(filterValue);
    });
    this.dataSource = data;
    this.matTable.renderRows();
  }

  getData() {
    this.http.get(this.api.MembersURL).subscribe({
      next: (response) => {
        const ResponseData: any = response;
        const data: MemberFormat[] = ResponseData;
        this.membersData = data.filter(
          (member) => member.role === 'ADMIN' || member.role === 'HR'
        );
        this.dataSource = this.membersData;
        this.search = this.membersData;
        this.tableLoading = false;
      },
      error: (error) => {
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(['login']);
        }
        console.log('Error occoured', error);
        this.toast.error('Error in getting Members from Server');
      },
    });
  }

  openDialog() {
    const dialogRef = this.matDialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.add(this.api.AddMemberURL, result).subscribe({
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

  handleDelteAdmin(element: any): void {
    element.loading = !element.loading;
    this.http.delete(`${this.api.MembersURL}/${element._id}`).subscribe({
      next: (response: any) => {
        this.getData();
        this.matTable.renderRows();
        setTimeout(() => {
          this.toast.success(response.message);
        }, 1000);
        element.loading = !element.loading;
      },
      error: (error) => {
        console.error('Error Occoured', error);
        element.loading = !element.loading;
      },
    });
  }
}
