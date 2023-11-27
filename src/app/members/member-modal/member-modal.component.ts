import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MembersComponent } from '../members.component';
import { ProjectFormat } from 'src/app/shared/user.interfaces';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrl: './member-modal.component.css',
})
export class MemberModalComponent {
  options = [
    'Frontend',
    'Backend',
    'Business Developer',
    'Social Marketing',
    'HR',
  ];

  constructor(
    public dialogRef: MatDialogRef<MembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.adminsData) {
      const editData = data.adminsData?.find(
        (adminData: any) => adminData._id === data.id
      );

      this.setProjectOptions(data.projectsData);
      const ProjectIDs = editData.projects?.map((project: any) => project._id);
      if (editData) {
        this.memberForm.patchValue({
          username: editData.username,
          first_name: editData.first_name,
          last_name: editData.last_name,
          email: editData.email,
          tech_stack: editData.tech_stack,
          team_lead: editData.team_lead,
          projects: ProjectIDs,
          expense: editData.expense,
        });
      }
    } else {
      this.setProjectOptions(data.projectsData);
    }
  }

  setProjectOptions(data: any) {
    this.Poptions = data;
  }

  Toptions = ['Fahad Tufail', 'RubNawaz Ansari', 'Marsad'];
  isValid: boolean = false;
  Poptions!: ProjectFormat[];

  memberForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    tech_stack: new FormControl(''),
    team_lead: new FormControl(''),
    projects: new FormControl([]),
    expense: new FormControl(0, [Validators.required]),
  });

  onSubmit() {
    if (this.memberForm.valid) {
      this.isValid = false;
      this.dialogRef.close(this.memberForm.value);
    } else {
      this.isValid = true;
    }
  }
}
