import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from "@angular/forms";
import { HTTPService } from "../http.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export const URL="https://tdc-dashboard-5ec92093d7de.herokuapp.com/login";
     

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

constructor(private http:HTTPService, private router:Router, private toast:ToastrService ){}

  loginForm = new FormGroup({
    username:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required]),
   });

   loading:boolean=false;

  onSubmit(){
    if(this.loginForm.valid)
    {
      this.loading=true;
      const loginDetails=this.loginForm.value;

      this.http.post(URL,loginDetails).subscribe({
        next: (result) => {
          if(result)
          {
            this.toast.success("Login Successfully");
            const userData=JSON.stringify(result);
            localStorage.setItem("userData",userData)
            this.router.navigate(['admins']);
            this.loading=false;
          }
        },
        error: (err:any) => {
          console.error('An error occurred:', err);
          this.toast.error(err.error.message);
          this.loading=false;
        }
      });    
      
    }
  }

}
