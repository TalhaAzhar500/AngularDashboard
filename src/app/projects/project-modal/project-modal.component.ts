import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsComponent } from '../projects.component';

@Component({
  selector: 'project-modal',
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css',
})
export class ProjectModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      const editData = data.ProjectsData?.find(
        (ProjectsData: any) => ProjectsData._id === data.id
      );
      if (editData) {
        this.projectForm.patchValue({
          name: editData.name,
          stack: editData.stack,
          team_lead: editData.team_lead,
          duration: editData.duration,
          coordinator: editData.coordinator,
          platform: editData.platform,
          client: editData.client,
          consultant: editData.consultant,
          start_date: editData.start_date,
          end_date: editData.end_date,
          status: editData.status,
        });
      }
    }
  }

  Toptions = ['Fahad Tufail', 'RubNawaz Ansari', 'Marsad'];
  isValid: boolean = false;

  projectForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    stack: new FormControl('', [Validators.required]),
    team_lead: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    coordinator: new FormControl('', [Validators.required]),
    platform: new FormControl('', [Validators.required]),
    client: new FormControl('', [Validators.required]),
    consultant: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
    cost: new FormControl('0'),
  });

  onSubmit() {
    if (this.projectForm.valid) {
      const SDate: any = this.projectForm.value.start_date;
      const EDate: any = this.projectForm.value.end_date;
      if (EDate <= SDate) {
        console.log('End date is Less');
        return;
      }
      this.isValid = false;
      this.dialogRef.close(this.projectForm.value);
    } else {
      this.isValid = true;
    }
  }
}
