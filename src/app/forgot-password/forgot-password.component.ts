import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HTTPService } from '../http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../shared/url.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  constructor(
    private http: HTTPService,
    private router: Router,
    private toast: ToastrService,
    private api: UrlService
  ) {}

  @Input() id!: string;
  @Input() token!: string;

  passwordForm = new FormGroup({
    new_password: new FormControl('', [Validators.minLength(5)]),
    confirm_password: new FormControl('', [Validators.minLength(5)]),
  });

  loading: boolean = false;

  onSubmit() {
    if (this.passwordForm.valid) {
      if (
        this.passwordForm.value.new_password !==
        this.passwordForm.value.confirm_password
      ) {
        this.toast.error('New Password does not match confirm password');
        return;
      }

      this.loading = true;
      const passwords = this.passwordForm.value;
      this.http
        .forget(`${this.api.ForgotPassURL}/${this.id}/${this.token}`, passwords)
        .subscribe({
          next: (res) => {
            this.toast.success('Password reset successfully. Please login.');
            this.router.navigate(['login']);
          },
          error: (error) => {
            console.error('Error', error);
          },
        });
    }
  }
}
