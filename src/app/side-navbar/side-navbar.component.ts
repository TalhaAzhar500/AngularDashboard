import { Component, effect, signal, OnInit } from '@angular/core';
import { UserDetailsService } from '../shared/user-details.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css',
})
export class SideNavbarComponent implements OnInit {
  constructor(
    private userData: UserDetailsService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.name = this.userData?.data?.name;
  }

  ngOnInit(): void {
    const LocalData: any = localStorage.getItem('userData');
    const data = JSON.parse(LocalData);
    this.role = this.userData.data.role;
  }

  role: string = this.userData?.data?.role;
  name: string = this.userData?.data?.name;

  handleLogout() {
    this.toast.success('Logout Succesfully');
    localStorage.clear();
    this.router.navigate(['']);
  }
}
