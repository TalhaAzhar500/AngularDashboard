import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent {

constructor(private router:Router){}

navigateToAdmins(){
  this.router.navigate(['admins']);
}

}
