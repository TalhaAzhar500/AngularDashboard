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
    new_password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
  });

  loading: boolean = false;

  onSubmit() {
    if (this.passwordForm.valid) {
      this.loading = true;
      const passwords = this.passwordForm.value;
      this.http
        .reset(this.api.ResetPassURL, passwords)
        .toPromise()
        .then((res) => {
          console.log('response', res);
        });

      // .subscribe({
      //   next: (result) => {
      //     console.log('result', result);
      //     // this.toast.success(result);
      //     this.loading = false;
      //   },
      //   error: (err: any) => {
      //     console.error('An error occurred:', err);
      //     this.toast.error(err.error.message);
      //     this.loading = false;
      //   },
      // });
    }
  }
}
