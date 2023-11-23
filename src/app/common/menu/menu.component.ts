import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDetailsService } from 'src/app/shared/user-details.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(
    private router: Router,
    private toast: ToastrService,
    private userData: UserDetailsService
  ) {}

  role: string = this.userData.data.role;

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  NavigateToAdmins() {
    this.router.navigate(['admins']);
  }
  NavigateToMembers() {
    this.router.navigate(['members']);
  }

  NavigateToProjects() {
    this.router.navigate(['projects']);
  }

  NavigateToResetPassword() {
    this.router.navigate(['reset-password']);
  }

  handleLogout() {
    this.toast.success('Logout Succesfully');
    localStorage.clear();
    this.router.navigate(['']);
  }
}
