import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { HTTPService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../shared/url.service';
import { MemberFormat, ProjectFormat } from '../shared/user.interfaces';
import { MemberModalComponent } from './member-modal/member-modal.component';
import { UserDetailsService } from '../shared/user-details.service';
import { Router } from '@angular/router';
import { ProjectsModalComponent } from './projects-modal/projects-modal.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  @ViewChild('actionTrigger') actionTrigger!: MatMenuTrigger;
  @ViewChild(MatTable) matTable!: MatTable<MemberFormat>;

  displayedColumns: string[] = [
    'username',
    'first_name',
    'last_name',
    'email',
    'tech_stack',
    'team_lead',
    'projectModal',
    'action',
  ];

  displayedColumns2: string[] = [
    'username',
    'first_name',
    'last_name',
    'email',
    'tech_stack',
    'team_lead',
    'projectModal',
  ];

  dataSource!: MemberFormat[];
  projectsData!: ProjectFormat[];
  search!: MemberFormat[];
  role: string = this.userData.data.role;
  loading: boolean = false;
  tableLoading: boolean = true;
  userID: string = this.userData.data.id;
  ShowActionHeading: boolean = true;

  constructor(
    private matDialog: MatDialog,
    private http: HTTPService,
    private toast: ToastrService,
    private api: UrlService,
    private userData: UserDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMembersData();
    this.getProjectData();
    this.ShowActionHeading = this.role === 'admin' ? true : false;
  }

  applyFilter(event: Event) {
    const filterValue: any = (event.target as HTMLInputElement).value;
    const data = this.search.filter((data) => {
      return filterValue.toLowerCase() === ''
        ? data
        : data.username.toLowerCase().includes(filterValue) ||
            data.first_name.toLowerCase().includes(filterValue) ||
            data.last_name.toLowerCase().includes(filterValue);
    });
    this.dataSource = data;
    this.matTable.renderRows();
  }

  getMembersData() {
    this.http.get(this.api.MemberURL).subscribe({
      next: (response) => {
        const data: any = response;
        this.dataSource = data;
        this.search = data;
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

  getProjectData() {
    if (this.role === 'user') {
      return;
    }
    this.http.get(this.api.ProjectURL).subscribe({
      next: (response) => {
        const data: any = response;
        this.projectsData = data;
      },
      error: (error) => {
        console.log('Error occoured', error);
        this.toast.error('Error in getting Projects from Server');
      },
    });
  }

  openDialog() {
    const dialogRef = this.matDialog.open(MemberModalComponent, {
      data: {
        projectsData: this.projectsData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.add(this.api.MemberURL, result).subscribe({
          next: (response) => {
            this.toast.success('Member Added Successfully');
            this.getMembersData();
            this.matTable.renderRows();
          },
          error: (error) => {
            console.log('Error Occoured while adding member', error);
            this.toast.error('Adding Member failed!', error);
          },
        });
      }
    });
  }

  openProjectDialog(element: any) {
    const dialogRef = this.matDialog.open(ProjectsModalComponent, {
      minWidth: '300px',
      data: {
        projectsData: element,
      },
    });
  }

  handleDelteAdmin(element: any) {
    element.loading = !element.loading;
    this.http.delete(`${this.api.MemberURL}/${element._id}`).subscribe({
      next: (response: any) => {
        this.getMembersData();
        this.matTable.renderRows();
        setTimeout(() => {
          this.toast.success(response.message);
          element.loading = !element.loading;
        }, 1000);
      },
      error: (error) => {
        element.loading = !element.loading;
        console.error('Error Occoured', error);
      },
    });
  }

  handleEditAdmin(element: any) {
    const dialogRef = this.matDialog.open(MemberModalComponent, {
      data: {
        id: element._id,
        adminsData: this.dataSource,
        projectsData: this.projectsData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        element.loading = !element.loading;
        this.http
          .edit(`${this.api.MemberURL}/${element._id}`, result)
          .subscribe({
            next: (response: any) => {
              this.getMembersData();
              this.matTable.renderRows();
              this.toast.success('member Edited Successfully');
              element.loading = !element.loading;
            },
            error: (error) => {
              element.loading = !element.loading;
              console.error('Error Occoured', error);
            },
          });
      }
    });
  }
}
