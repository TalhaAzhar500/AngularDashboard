import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HTTPService } from '../http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../shared/url.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';
import { UserDetailsService } from '../shared/user-details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private matDialog: MatDialog,
    private http: HTTPService,
    private router: Router,
    private toast: ToastrService,
    private api: UrlService,
    private user: UserDetailsService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loading: boolean = false;

  openDialog() {
    const dialogRef = this.matDialog.open(ForgotPasswordModalComponent);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const loginDetails = this.loginForm.value;

      this.http.post(this.api.LoginURL, loginDetails).subscribe({
        next: (result) => {
          if (result) {
            this.toast.success('Login Successfully');
            this.user.setUserData(result);
            const userData = JSON.stringify(result);
            localStorage.setItem('userData', userData);
            this.router.navigate(['admins']);
            this.loading = false;
          }
        },
        error: (err: any) => {
          console.error('An error occurred:', err);
          this.toast.error(err.error.message);
          this.loading = false;
        },
      });
    }
  }
}
