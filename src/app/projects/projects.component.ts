import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { HTTPService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { UrlService } from '../shared/url.service';
import { ProjectFormat } from '../shared/user.interfaces';
import { Router } from '@angular/router';

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
  search!: ProjectFormat[];
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
    this.http.get(this.api.ProjectURL).subscribe({
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

  handleDelteAdmin(element: any) {
    element.loading = !element.loading;
    this.http.delete(`${this.api.ProjectURL}/${element._id}`).subscribe({
      next: (response: any) => {
        this.getData();
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
    const dialogRef = this.matDialog.open(ProjectModalComponent, {
      data: {
        id: element._id,
        adminsData: this.dataSource,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        element.loading = !element.loading;
        this.http
          .edit(`${this.api.ProjectURL}/${element._id}`, result)
          .subscribe({
            next: (response: any) => {
              this.getData();
              this.matTable.renderRows();
              element.loading = !element.loading;
              this.toast.success('Project Edited Successfully');
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
