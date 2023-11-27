import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MembersComponent } from '../members.component';
import { ProjectFormat } from 'src/app/shared/user.interfaces';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'projects-modal',
  templateUrl: './projects-modal.component.html',
  styleUrl: './projects-modal.component.css',
})
export class ProjectsModalComponent {
  @ViewChild(MatTable) matTable!: MatTable<ProjectFormat>;

  constructor(
    public dialogRef: MatDialogRef<MembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.projectsData.projects[0]) {
      this.show = true;
      this.dataSource = data.projectsData.projects;
    } else {
      this.show = false;
    }
    console.log('data', data.projectsData.projects);
  }

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
  ];

  dataSource!: ProjectFormat[];
  show: boolean = true;
}
