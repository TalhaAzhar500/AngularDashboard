import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { HTTPService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { UrlService } from '../shared/url.service';
import { ProjectFormat } from '../shared/user.interfaces';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  @ViewChild('actionTrigger') actionTrigger!: MatMenuTrigger;
  @ViewChild(MatTable) matTable!: MatTable<ProjectFormat>;

  displayedColumns: string[] = [
    'name',
    'stack',
    'team_lead',
    'duration',
    'coordinator',
    'platform',
    'client',
    'consultant',
    'start_date',
    'end_date',
    'status',
    'action',
  ];
  dataSource!: ProjectFormat[];

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
    this.http.get(this.api.ProjectURL).subscribe({
      next: (response) => {
        const data: any = response;
        this.dataSource = data;
      },
      error: (error) => {
        console.log('Error occoured', error);
        this.toast.error('Error in getting projects from Server');
      },
    });
  }

  openDialog() {
    const dialogRef = this.matDialog.open(ProjectModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.add(this.api.ProjectURL, result).subscribe({
          next: (response) => {
            this.toast.success('Project Added Successfully');
            this.getData();
            this.matTable.renderRows();
          },
          error: (error) => {
            console.log('Error Occoured while adding member', error);
            this.toast.error('Adding project failed!', error);
          },
        });
      }
    });
  }

  handleDelteAdmin(id: number) {
    this.http.delete(`${this.api.ProjectURL}/${id}`).subscribe({
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

  handleEditAdmin(id: number) {
    const dialogRef = this.matDialog.open(ProjectModalComponent, {
      data: {
        idToDelete: id,
        adminsData: this.dataSource,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http.edit(`${this.api.ProjectURL}/${id}`, result).subscribe({
        next: (response: any) => {
          this.getData();
          this.matTable.renderRows();
          this.toast.success('Project Edited Successfully');
        },
        error: (error) => {
          console.error('Error Occoured', error);
        },
      });
    });
  }
}
