import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'not-found',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css']
})
export class NotFoundComponent {

  constructor(private router:Router){

  }

  navigateToLogin(){
    this.router.navigate(['']);
  }

}
