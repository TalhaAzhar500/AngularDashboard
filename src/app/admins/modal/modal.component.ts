import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectFormat } from 'src/app/shared/user.interfaces';

@Component({
  selector: 'AdminModal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}

  isValid: boolean = false;
  Poptions!: ProjectFormat[];

  Toptions = ['HR', 'TECH', 'HELPER'];
  options = [
    'Frontend',
    'Backend',
    'Business Developer',
    'Social Marketing',
    'HR',
  ];

  memberForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tech_stack: new FormControl(''),
    role: new FormControl('', [Validators.required]),
    department: new FormControl('656f2f35c0cbe64a98cf76e7'),
    teams: new FormControl('656f2f35c0cbe64a98cf76e7'),
    projects: new FormControl([]),
  });

  submitForm() {
    if (this.memberForm.valid) {
      this.isValid = false;
      this.dialogRef.close(this.memberForm.value);
    } else {
      this.isValid = true;
    }
  }
}
