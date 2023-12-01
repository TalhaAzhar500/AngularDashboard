import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './404/404.component';
import { authGuard } from './auth.guard';
import { ProjectsComponent } from './projects/projects.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'sign-up', component: SignUpComponent },
//   {
//     path: 'newpassword/id/:id/token/:token',
//     component: ForgotPasswordComponent,
//   },
//   { path: 'login', component: LoginComponent, canActivate: [authGuard] },
//   { path: 'home', component: HomeComponent, canActivate: [authGuard] },
//   { path: 'admins', component: AdminsComponent, canActivate: [authGuard] },
//   { path: 'members', component: MembersComponent, canActivate: [authGuard] },
//   { path: 'projects', component: ProjectsComponent, canActivate: [authGuard] },
//   {
//     path: 'reset-password',
//     component: ResetPasswordComponent,
//     canActivate: [authGuard],
//   },
//   { path: '**', component: NotFoundComponent },
// ];

// app-routing.module.ts
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
    // outlet: 'loginOutlet',
  },
  {
    path: 'dashboard',
    component: SideNavbarComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'members', component: MembersComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
