import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from 'src/app/admins/admins.component';
import { HomeComponent } from 'src/app/home/home.component';
import { MembersComponent } from 'src/app/members/members.component';
import { ProjectsComponent } from 'src/app/projects/projects.component';
import { ResetPasswordComponent } from 'src/app/reset-password/reset-password.component';
import { SideNavbarComponent } from 'src/app/side-navbar/side-navbar.component';

const routes: Routes = [
  {
    path: '',
    component: SideNavbarComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'members', component: MembersComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
