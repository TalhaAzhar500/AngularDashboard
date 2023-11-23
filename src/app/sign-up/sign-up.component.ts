import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HTTPService } from '../http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../shared/url.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(
    private http: HTTPService,
    private router: Router,
    private toast: ToastrService,
    private api: UrlService
  ) {}

  hide: boolean = true;
  options = [
    'Frontend',
    'Backend',
    'Business Developer',
    'Social Marketing',
    'HR',
  ];

  signUpForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    tech_stack: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  loading: boolean = false;

  onSubmit() {
    if (this.signUpForm.valid) {
      this.loading = true;
      const memberDetails = this.signUpForm.value;

      this.http.post(this.api.SignUpURL, memberDetails).subscribe({
        next: (result) => {
          if (result) {
            this.toast.success('Signed Up Successfully');
            this.router.navigate(['login']);
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
