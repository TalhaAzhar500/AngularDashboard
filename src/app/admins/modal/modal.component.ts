import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'AdminModal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}

  isValid: boolean = false;

  adminForm = new FormGroup({
    admin_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  submitForm() {
    if (this.adminForm.valid) {
      this.isValid = false;
      this.dialogRef.close(this.adminForm.value);
    } else {
      this.isValid = true;
    }
  }
}
