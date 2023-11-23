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
    'action',
  ];
  dataSource!: MemberFormat[];
  projectsData!: ProjectFormat[];
  role: string = this.userData.data.role;

  constructor(
    private matDialog: MatDialog,
    private http: HTTPService,
    private toast: ToastrService,
    private api: UrlService,
    private userData: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.getMembersData();
    this.getProjectData();
  }

  getMembersData() {
    this.http.get(this.api.MemberURL).subscribe({
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

  handleDelteAdmin(id: number) {
    this.http.delete(`${this.api.MemberURL}/${id}`).subscribe({
      next: (response: any) => {
        this.getMembersData();
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

  handleEditAdmin(id: number) {
    const dialogRef = this.matDialog.open(MemberModalComponent, {
      data: {
        id: id,
        adminsData: this.dataSource,
        projectsData: this.projectsData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http.edit(`${this.api.MemberURL}/${id}`, result).subscribe({
        next: (response: any) => {
          this.getMembersData();
          this.matTable.renderRows();
          this.toast.success('member Edited Successfully');
        },
        error: (error) => {
          console.error('Error Occoured', error);
        },
      });
    });
  }
}
