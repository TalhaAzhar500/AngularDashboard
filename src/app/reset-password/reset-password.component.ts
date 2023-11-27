import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HTTPService } from '../http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../shared/url.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  constructor(
    private http: HTTPService,
    private router: Router,
    private toast: ToastrService,
    private api: UrlService
  ) {}

  passwordForm = new FormGroup({
    old_password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    confirm_password: new FormControl('', [Validators.required]),
  });

  loading: boolean = false;

  onSubmit() {
    if (this.passwordForm.valid) {
      if (
        this.passwordForm.value.old_password ===
        this.passwordForm.value.new_password
      ) {
        this.toast.error('New password is same as Old password');
        return;
      }
      if (
        this.passwordForm.value.new_password !==
        this.passwordForm.value.confirm_password
      ) {
        this.toast.error('Confirm password must be same as New password');
        return;
      }

      this.loading = true;
      const passwords = this.passwordForm.value;
      this.http.reset(this.api.ResetPassURL, passwords).subscribe({
        next: (result) => {
          this.router.navigate(['']);
          console.log('result', result);
          this.loading = false;
        },
        error: (err: any) => {
          console.error('An error occurred:', err);
          this.toast.error(err.error.message);
          this.loading = false;
        },
      });
      this.passwordForm.patchValue({
        old_password: '',
        new_password: '',
        confirm_password: '',
      });
    }
  }
}
