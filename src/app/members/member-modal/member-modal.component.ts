import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MembersComponent } from '../members.component';
import {
  DepartmentFormat,
  ProjectFormat,
} from 'src/app/shared/user.interfaces';

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
    console.log('MOdal Data', data.departmentData);
    if (data?.membersData) {
      const editData = data.membersData?.find(
        (memberData: any) => memberData._id === data.id
      );

      this.setProjectOptions(data.projectsData);
      const ProjectIDs = editData.projects?.map((project: any) => project._id);
      if (editData) {
        this.memberForm.patchValue({
          name: editData.name,
          email: editData.email,
          tech_stack: editData.tech_stack,
          role: editData.role,
          projects: ProjectIDs,
        });
      }
    } else {
      this.setProjectOptions(data?.projectsData ? data.projectsData : []);
      this.setDepartmentOptions(data.departmentData);
    }
  }

  setProjectOptions(data: any) {
    this.Poptions = data;
  }

  setDepartmentOptions(data: any) {
    this.Doptions = data;
  }

  Toptions = ['HR', 'TECH', 'HELPER'];
  isValid: boolean = false;
  Poptions!: ProjectFormat[];
  Doptions!: DepartmentFormat[];

  memberForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tech_stack: new FormControl(''),
    role: new FormControl('', [Validators.required]),
    department: new FormControl('656f2f35c0cbe64a98cf76e7'),
    teams: new FormControl('656f2f35c0cbe64a98cf76e7'),
    projects: new FormControl([]),
  });

  onSubmit() {
    if (this.memberForm.valid) {
      console.log('data', this.memberForm.value);
      this.isValid = false;
      this.dialogRef.close(this.memberForm.value);
    } else {
      this.isValid = true;
    }
  }
}
