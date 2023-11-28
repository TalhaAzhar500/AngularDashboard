import { Component, Inject } from '@angular/core';
import { ProjectsComponent } from '../projects.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'info-modal',
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.css',
})
export class InfoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.start_date = data.projectData.start_date;
    this.end_date = data.projectData.end_date;
    this.status = data.projectData.status;
  }

  start_date!: string;
  end_date!: string;
  status!: string;
}
