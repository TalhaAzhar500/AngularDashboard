import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HTTPService } from 'src/app/http.service';
import { UrlService } from 'src/app/shared/url.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrl: './forgot-password-modal.component.css',
})
export class ForgotPasswordModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordModalComponent>,
    private http: HTTPService,
    private toast: ToastrService,
    private api: UrlService
  ) {}

  isValid: boolean = false;

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submitForm() {
    if (this.forgotForm.valid) {
      const email = this.forgotForm.value;
      this.http.sendEmail(this.api.ForgotPassURL, email).subscribe({
        next: (response) => {
          this.toast.success(
            'Please check your Gmail for password reset instructions!'
          );
        },
        error: (error: any) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            this.toast.error(error.response.data.message);
          } else {
            this.toast.error('An unexpected error occurred. Please try again.');
          }
        },
      });
    }
  }
}
