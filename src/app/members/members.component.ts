import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { HTTPService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../shared/url.service';
import {
  DepartmentFormat,
  MemberFormat,
  ProjectFormat,
} from '../shared/user.interfaces';
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
    'name',
    'email',
    'role',
    'tech_stack',
    'projectModal',
    'action',
  ];

  displayedColumns2: string[] = [
    'name',
    'email',
    'role',
    'tech_stack',
    'projectModal',
  ];

  dataSource!: MemberFormat[];
  projectsData!: ProjectFormat[];
  membersData!: MemberFormat[];
  departmentData!: DepartmentFormat[];
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
    this.getDepartmentData();
    this.ShowActionHeading = this.role === 'admin' ? true : false;
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

  getMembersData() {
    this.http.get(this.api.MembersURL).subscribe({
      next: (response) => {
        const ResponseData: any = response;
        const data: MemberFormat[] = ResponseData;
        this.membersData = data.filter(
          (member) =>
            member.role !== 'SUPERADMIN' &&
            member.role !== 'ADMIN' &&
            member.role !== 'HR' &&
            member.role !== 'SALES_AGENT'
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

  getDepartmentData() {
    this.http.get(this.api.DepartmentURL).subscribe({
      next: (response) => {
        const data: any = response;
        this.departmentData = data;
        console.log('Dep Data', data);
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
        departmentData: this.departmentData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.add(this.api.AddMemberURL, result).subscribe({
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
    this.http.delete(`${this.api.MembersURL}/${element._id}`).subscribe({
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
        membersData: this.membersData,
        projectsData: this.projectsData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        element.loading = !element.loading;
        this.http
          .edit(`${this.api.MembersURL}/${element._id}`, result)
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
